const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 20;
const MAX_ENTRIES = 10000;
const CLEANUP_INTERVAL_MS = 60 * 1000;

const requestCounts = new Map();
let lastCleanup = Date.now();

const evictStaleEntries = (now) => {
  for (const [key, entry] of requestCounts.entries()) {
    if (now - entry.windowStart >= WINDOW_MS) {
      requestCounts.delete(key);
    }
  }
};

/**
 * Derives a rate-limit key for the current request.
 *
 * Priority:
 *   1. Authenticated user ID (most reliable — cannot be spoofed).
 *   2. Composite fingerprint combining req.ip, the raw socket remote address,
 *      and the User-Agent header. This ensures that even if an attacker spoofs
 *      X-Forwarded-For (when trust proxy is misconfigured), the raw socket IP
 *      still anchors them to their real origin.
 */
const deriveRateLimitKey = (req) => {
  if (req.user?.id) {
    return `uid:${req.user.id}`;
  }

  const expressIp = req.ip || "unknown";
  const socketIp = req.socket?.remoteAddress || "unknown";
  const ua = req.headers["user-agent"] || "no-ua";

  return `ip:${expressIp}|${socketIp}|${ua}`;
};

export const rateLimiter = (req, res, next) => {
  const key = deriveRateLimitKey(req);
  const now = Date.now();

  // Passive eviction: clean up stale entries lazily to avoid holding the event loop open
  if (now - lastCleanup >= CLEANUP_INTERVAL_MS) {
    evictStaleEntries(now);
    lastCleanup = now;
  }

  let entry = requestCounts.get(key);

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    if (!entry && requestCounts.size >= MAX_ENTRIES) {
      const oldestKey = requestCounts.keys().next().value;
      if (oldestKey !== undefined) {
        requestCounts.delete(oldestKey);
      }
    }
    requestCounts.set(key, { count: 1, windowStart: now });
    return next();
  }

  if (entry.count >= MAX_REQUESTS) {
    return res.status(429).json({
      error: "Too many requests. Please wait before sending more messages.",
    });
  }

  entry.count += 1;
  next();
};

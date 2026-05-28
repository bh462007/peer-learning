export const requestCounts = new Map();

export const rateLimiter = (req, res, next) => {
  const userId = req.user.id;
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 20;

  const entry = requestCounts.get(userId);

  if (!entry || now - entry.windowStart >= windowMs) {
    requestCounts.set(userId, { count: 1, windowStart: now });
    return next();
  }

  if (entry.count >= maxRequests) {
    return res.status(429).json({
      error: "Too many requests. Please wait before sending more messages.",
    });
  }

  entry.count += 1;
  next();
};

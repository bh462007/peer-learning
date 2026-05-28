import express from "express";
import { askAI } from "../controllers/aiController.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();
router.post("/ask", requireAuth, rateLimiter, askAI);

export default router;

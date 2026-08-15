import { rateLimit } from "express-rate-limit";

export const appLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: { message: "Too many requests, please try again 15 minutes later." },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: {
    error: {
      message: "Too many login attempts, please try again 1 minute later.",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

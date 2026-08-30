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

export const otpCooldownLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 1,
  message: {
    error: {
      message: "Please wait 2 minutes before requesting a new code.",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const otpMaxAttemptsLimiter = rateLimit({
  windowMs: 25 * 60 * 1000,
  max: 3,
  message: {
    error: {
      message: "Too many OTP requests. Please try again after 25 minutes.",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

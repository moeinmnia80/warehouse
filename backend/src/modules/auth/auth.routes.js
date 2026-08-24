import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import {
  authLimiter,
  otpCooldownLimiter,
  otpMaxAttemptsLimiter,
} from "../../middlewares/limiter.middleware.js";
import {
  getUserController,
  loginUserController,
  verifyOtpController,
  registerUserController,
  regenerateOtpController,
  forgetPasswordController,
  loginWithGoogleUserController,
  resetPasswordController,
} from "./auth.controller.js";
import {
  LoginUserSchema,
  RegisterUserSchema,
  ForgetPasswordSchema,
  LoginWithGooglUserSchema,
} from "./auth.schemas.js";

export const router = Router();

router.get("/me", authenticate, getUserController);
router.post(
  "/login",
  authLimiter,
  validate(LoginUserSchema),
  loginUserController,
);
router.post(
  "/login/google",
  authLimiter,
  validate(LoginWithGooglUserSchema),
  loginWithGoogleUserController,
);
router.post("/register", validate(RegisterUserSchema), registerUserController);
router.post(
  "/forget-password",
  otpMaxAttemptsLimiter,
  validate(ForgetPasswordSchema),
  forgetPasswordController,
);
router.patch("/reset-password", otpMaxAttemptsLimiter, resetPasswordController);

router.post(
  "/resend-otp",
  otpCooldownLimiter,
  otpMaxAttemptsLimiter,
  regenerateOtpController,
);
router.post("/verify-otp", otpMaxAttemptsLimiter, verifyOtpController);

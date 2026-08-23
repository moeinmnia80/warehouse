import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authLimiter } from "../../middlewares/limiter.middleware.js";
import {
  getUserController,
  loginUserController,
  registerUserController,
  loginWithGoogleUserController,
  forgetPasswordController,
} from "./auth.controller.js";
import {
  LoginUserSchema,
  RegisterUserSchema,
  LoginWithGooglUserSchema,
  ForgetPasswordSchema,
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
  authenticate,
  authLimiter,
  validate(ForgetPasswordSchema),
  forgetPasswordController,
);
router.patch("/reset-password", (req, res) => {
  res.send("Reset password route");
});

import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import {
  getUserController,
  loginUserController,
  registerUserController,
} from "./auth.controller.js";
import { LoginUserSchema, RegisterUserSchema } from "./auth.schemas.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

export const router = Router();

router.get("/me", authenticate, getUserController);
router.post("/login", validate(LoginUserSchema), loginUserController);
router.post("/register", validate(RegisterUserSchema), registerUserController);
router.post("/forget-password", (req, res) => {
  // Handle forget password logic here
  res.send("Forget password route");
});
router.patch("/reset-password", (req, res) => {
  // Handle reset password logic here
  res.send("Reset password route");
});

import { Router } from "express";
import { RegisterUserSchema, LoginUserSchema } from "./auth.schemas.js";
import { validate } from "../../middlewares/validate.js";
import {
  loginUserController,
  registerUserController,
} from "./auth.controller.js";

export const router = Router();

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

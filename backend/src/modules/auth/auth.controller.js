import { catchAsync } from "../../utils/async.js";
import { cookieOptions } from "../../config/cookie.js";
import {
  getMe,
  loginUser,
  registerUser,
  loginWithGoogle,
} from "./auth.service.js";

export const loginUserController = catchAsync(async (req, res) => {
  const result = await loginUser(req.body);
  res.cookie("auth-token", result.data.token, cookieOptions);
  res.set("Catch-Control", "public", "max-age=3600");
  return res.status(200).json(result);
});

export const loginWithGoogleUserController = catchAsync(async (req, res) => {
  const result = await loginWithGoogle(req.body);
  res.cookie("auth-token", result.data.token, cookieOptions);
  return res.status(200).json(result);
});

export const registerUserController = catchAsync(async (req, res) => {
  const result = await registerUser(req.body);
  res.set("Catch-Control", "public", "max-age=86400");
  return res.status(201).json(result);
});
export const getUserController = catchAsync(async (req, res) => {
  const result = await getMe(req);
  res.set("Catch-Control", "private", "max-age=3600");
  return res.status(200).json(result);
});

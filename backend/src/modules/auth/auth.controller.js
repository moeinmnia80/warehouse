import { catchAsync } from "../../utils/async.js";
import { cookieOptions } from "../../config/cookie.js";

import {
  getMe,
  loginUser,
  verifyOtp,
  registerUser,
  regenerateOtp,
  resetPassword,
  forgetPassword,
  loginWithGoogle,
} from "./auth.service.js";

export const loginUserController = catchAsync(async (req, res) => {
  const {
    data: { token, ...result },
    ...rest
  } = await loginUser(req.body);
  res.cookie("auth-token", token, cookieOptions);
  res.set("Catch-Control", "public", "max-age=3600");
  return res.status(200).json({ ...rest, data: result });
});

export const loginWithGoogleUserController = catchAsync(async (req, res) => {
  const {
    data: { token, ...result },
    ...rest
  } = await loginWithGoogle(req.body);
  res.cookie("auth-token", token, cookieOptions);
  return res.status(200).json({ ...rest, data: result });
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

export const forgetPasswordController = catchAsync(async (req, res) => {
  const result = await forgetPassword(req);
  return res.status(200).json(result);
});

export const regenerateOtpController = catchAsync(async (req, res) => {
  const result = await regenerateOtp(req);
  return res.status(201).json(result);
});

export const verifyOtpController = catchAsync(async (req, res) => {
  const result = await verifyOtp(req);
  return res.status(200).json(result);
});

export const resetPasswordController = catchAsync(async (req, res) => {
  const result = await resetPassword(req);
  return res.status(200).json(result);
});

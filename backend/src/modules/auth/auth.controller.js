import { catchAsync } from "../../utils/async.js";
import {
  getMe,
  loginUser,
  registerUser,
  loginWithGoogle,
} from "./auth.service.js";

export const loginUserController = catchAsync(async (req, res) => {
  const result = await loginUser(req.body);
  return res.status(200).json(result);
});

export const loginWithGoogleUserController = catchAsync(async (req, res) => {
  const result = await loginWithGoogle(req.body);
  return res.status(200).json(result);
});

export const registerUserController = catchAsync(async (req, res) => {
  const result = await registerUser(req.body);
  return res.status(201).json(result);
});
export const getUserController = catchAsync(async (req, res) => {
  const result = await getMe(req);
  return res.status(200).json(result);
});

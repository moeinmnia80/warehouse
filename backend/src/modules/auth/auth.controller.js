import { catchAsync } from "../../utils/async.js";
import { loginUser, registerUser } from "./auth.service.js";

export const loginUserController = catchAsync(async (req, res) => {
  const result = await loginUser(req.body);
  console.log(result);

  return res.status(200).json(result);
});
export const registerUserController = catchAsync(async (req, res) => {
  const result = await registerUser(req.body);

  return res.status(201).json(result);
});

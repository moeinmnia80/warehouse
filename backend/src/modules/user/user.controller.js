import { catchAsync } from "../../utils/async.js";
import { getUserAddress, getUserPaymentMethod } from "./user.services.js";

export const getUserPaymentMethodController = catchAsync(async (req, res) => {
  const result = await getUserPaymentMethod(req);
  return res.status(200).json(result);
});
export const getUserAddressController = catchAsync(async (req, res) => {
  const result = await getUserAddress(req);
  return res.status(200).json(result);
});

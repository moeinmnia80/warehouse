import { catchAsync } from "../../utils/async.js";
import { createShipping, getShippingData } from "./shipping.services.js";

export const getShippingHistory = catchAsync(async (req, res) => {
  const result = await getShippingData(req);

  return res.status(200).json(result);
});
export const createShippingController = catchAsync(async (req, res) => {
  const result = await createShipping(req);

  return res.status(201).json(result);
});

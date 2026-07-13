import { catchAsync } from "../../utils/async.js";
import { createSuite, getSuiteData } from "./suite.services.js";

export const getSuiteController = catchAsync(async (req, res) => {
  const result = await getSuiteData(req);

  return res.status(200).json(result);
});
export const createSuiteController = catchAsync(async (req, res) => {
  const result = await createSuite(req.body);

  return res.status(201).json(result);
});

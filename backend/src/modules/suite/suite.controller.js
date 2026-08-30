import { catchAsync } from "../../utils/async.js";
import {
  createSuite,
  getSuiteData,
  addPackageImages,
  addPackagePdf,
  getFiles,
} from "./suite.services.js";

export const getSuiteController = catchAsync(async (req, res) => {
  const result = await getSuiteData(req);
  res.set("Catch-Control", "private", "max-age=3600");
  return res.status(200).json(result);
});

export const createSuiteController = catchAsync(async (req, res) => {
  const result = await createSuite(req.user);
  return res.status(201).json(result);
});

export const addPackageImagesController = catchAsync(async (req, res) => {
  const result = await addPackageImages(req);
  return res.status(200).json(result);
});

export const addPackagePdfController = catchAsync(async (req, res) => {
  const result = await addPackagePdf(req);
  return res.status(200).json(result);
});
export const getInvoiceController = catchAsync(async (req, res) => {
  const { fileUrl } = await getFiles(req);
  res.set("Catch-Control", "private", "max-age=3600");
  return res.status(200).json({ fileUrl });
});
export const getImagesController = catchAsync(async (req, res) => {
  const { fileUrl } = await getFiles(req);
  res.set("Catch-Control", "private", "max-age=3600");
  return res.status(200).json({ fileUrl });
});

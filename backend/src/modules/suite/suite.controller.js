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
  return res.status(200).json(result);
});

export const createSuiteController = catchAsync(async (req, res) => {
  const result = await createSuite(req.user); // fixed: was req.body — see Bug 3
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
export const downloadInvoiceController = catchAsync(async (req, res) => {
  const result = await getFiles(req);
  res.set("Content-Type", "application/octet-stream");
  return res.sendFile(result.fullPath);
});
export const getPackageIdImagesController = catchAsync(async (req, res) => {
  const result = await getFiles(req);
  return res.sendFile(result.fullPath);
});

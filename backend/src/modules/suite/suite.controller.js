import { catchAsync } from "../../utils/async.js";
import {
  createSuite,
  getSuiteData,
  addPackageImages,
  addPackagePdf,
  getPackageIdImages,
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
  const result = await downloadInvoice(req);
  return res.download(result.fullPath, result.downloadName);
});
export const getPackageIdImagesController = catchAsync(async (req, res) => {
  const result = await getPackageIdImages(req);
  return res.sendFile(result.fullPath);
});

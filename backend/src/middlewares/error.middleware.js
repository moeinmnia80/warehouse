import multer from "multer";
import { mapDatabaseError } from "../utils/mapDatabaseError.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorCode = err.errorCode || "INTERNAL_ERROR";

  err = mapDatabaseError(err);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      status: "fail",
      error: { code: err?.code, message: err.message },
    });
  }

  console.error({
    timestamp: new Date().toISOString(),
    status: statusCode,
    code: errorCode,
    message: err.message,
    path: req.originalUrl,
    method: req.method,
  });

  res.status(statusCode).json({
    status: "fail",
    error: { code: errorCode, message: err.message, details: err.details },
  });
};

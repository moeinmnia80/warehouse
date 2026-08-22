import { mapMulterError } from "../utils/mapMulterError.js";
import { mapDatabaseError } from "../utils/mapDatabaseError.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorCode = err.errorCode || "INTERNAL_ERROR";

  err = mapDatabaseError(err);
  err = mapMulterError(err);

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

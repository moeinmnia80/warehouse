import { mapMulterError } from "../utils/mapMulterError.js";
import { mapDatabaseError } from "../utils/mapDatabaseError.js";

export const errorHandler = (err, req, res, next) => {
  err = mapDatabaseError(err);
  err = mapMulterError(err);

  const statusCode = err.statusCode || 500;
  const errorCode = err.errorCode || "INTERNAL_ERROR";

  console.error({
    timestamp: new Date().toISOString(),
    status: statusCode,
    code: errorCode,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    path: req.originalUrl,
    method: req.method,
  });

  const isOperational = err.isOperational || false;
  const message = isOperational ? err.message : "Internal Server Error";

  res.status(statusCode).json({
    status: statusCode >= 500 ? "error" : "fail",
    error: {
      code: errorCode,
      message: message,
      details: err.details || null,
    },
  });
};

import AppError from "./appError.js";

export const mapDatabaseError = (err) => {
  if (!err.code || err.isOperational) return err;

  const map = {
    ER_DUP_ENTRY: {
      status: 409,
      code: "CONFLICT_ERROR",
      msg: "Duplicate entry",
    },
    ER_NO_REFERENCED_ROW_2: {
      status: 400,
      code: "VALIDATION_ERROR",
      msg: "Referenced record not found",
    },
    ER_ROW_IS_REFERENCED_2: {
      status: 409,
      code: "CONFLICT_ERROR",
      msg: "Record is in use",
    },
    ER_ACCESS_DENIED_ERROR: {
      status: 500,
      code: "DATABASE_ERROR",
      msg: "DB access denied",
    },
    ECONNREFUSED: {
      status: 500,
      code: "DATABASE_ERROR",
      msg: "DB connection refused",
    },
    PROTOCOL_CONNECTION_LOST: {
      status: 500,
      code: "DATABASE_ERROR",
      msg: "DB connection lost",
    },
  };

  const mapped = map[err.code];
  if (mapped) {
    const appErr = new AppError(mapped.msg, mapped.status, mapped.code);
    appErr.originalError = err;
    return appErr;
  }

  return new AppError("Database error", 500, "DATABASE_ERROR");
};

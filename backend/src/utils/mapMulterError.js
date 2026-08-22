import AppError from "./appError.js";

export const mapMulterError = (err) => {
  if (!err.code || err.isOperational) return err;

  const map = {
    LIMIT_FILE_SIZE: {
      status: 400,
      code: "FILE_TOO_LARGE",
      msg: "File size exceeds the allowed limit",
    },
    LIMIT_FILE_COUNT: {
      status: 400,
      code: "TOO_MANY_FILES",
      msg: "Too many files uploaded",
    },
    LIMIT_UNEXPECTED_FILE: {
      status: 400,
      code: "UNEXPECTED_FIELD",
      msg: "Unexpected field name for file upload",
    },
    LIMIT_FIELD_KEY: {
      status: 400,
      code: "FIELD_NAME_TOO_LONG",
      msg: "Field name is too long",
    },
    LIMIT_FIELD_VALUE: {
      status: 400,
      code: "FIELD_VALUE_TOO_LARGE",
      msg: "Field value is too large",
    },
    LIMIT_FIELD_COUNT: {
      status: 400,
      code: "TOO_MANY_FIELDS",
      msg: "Too many form fields",
    },
    LIMIT_PART_COUNT: {
      status: 400,
      code: "TOO_MANY_PARTS",
      msg: "Too many parts in multipart form",
    },
  };

  const mapped = map[err.code];
  if (mapped) {
    const appErr = new AppError(mapped.msg, mapped.status, mapped.code);
    appErr.originalError = err;
    return appErr;
  }

  return new AppError("File upload error", 500, "MULTER_ERROR");
};

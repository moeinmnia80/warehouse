class AppError extends Error {
  constructor(message, status = 500, code = "INTERNAL_ERROR", details = null) {
    super(message);
    this.statusCode = status;
    this.errorCode = code;
    this.details = details;
    this.isOperational = true;
  }
}
export default AppError;

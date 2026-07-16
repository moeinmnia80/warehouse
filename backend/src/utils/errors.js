import AppError from "./appError.js";

export const Errors = {
  // ── Validation (400)
  validation: (message, details = null) =>
    new AppError(message, 400, "VALIDATION_ERROR", details),

  // ── Authentication (401)
  authentication: (message = "Authentication required") =>
    new AppError(message, 401, "AUTHENTICATION_ERROR"),

  // ── Authorization (403)
  authorization: (message = "Access denied") =>
    new AppError(message, 403, "AUTHORIZATION_ERROR"),

  // ── Not Found (404)
  notFound: (resource = "Resource") =>
    new AppError(`${resource} not found`, 404, "NOT_FOUND"),

  // ── Conflict (409)
  conflict: (message = "Resource already exists") =>
    new AppError(message, 409, "CONFLICT_ERROR"),

  // ── Database (500)
  database: (message = "Database operation failed") =>
    new AppError(message, 500, "DATABASE_ERROR"),

  // ── External API (502)
  externalApi: (service = "External service") =>
    new AppError(`${service} is unavailable`, 502, "EXTERNAL_API_ERROR"),

  // ── Internal (500)
  internal: (message = "Internal server error") =>
    new AppError(message, 500, "INTERNAL_ERROR"),
  // ── badRequest (400)
  badRequest: (message = "bad request") =>
    new AppError(message, 400, "BAD_REQUEST"),
};

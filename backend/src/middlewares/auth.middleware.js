import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { Errors } from "../utils/errors.js";

export const authenticate = (req, res, next) => {
  let token = req.signedCookies && req.signedCookies["auth-token"];

  if (!token) {
    return next(
      Errors.authentication("Authentication token missing in cookies"),
    );
  }

  try {
    const payload = jwt.verify(token, env.dbPrivateKey);
    req.user = payload;
    next();
  } catch (err) {
    return next(Errors.authentication("Invalid or expired token"));
  }
};

export const authorize =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user) {
      return next(Errors.authentication("Not authenticated"));
    }
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        Errors.forbidden("You don't have permission to perform this action"),
      );
    }
    next();
  };

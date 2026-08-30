import env from "./env.js";

const isProduction = env.nodeEnv === "production";

export const cookieOptions = {
  path: "/",
  signed: true,
  httpOnly: true,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  secure: isProduction,
};

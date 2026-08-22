import env from "./env.js";

export const cookieOptions = {
  path: "/",
  signed: true,
  httpOnly: true,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  secure: env.nodeEnv === "production",
};

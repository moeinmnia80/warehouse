import crypto from "crypto";

export const generateOtpCode = () => {
  return crypto.randomInt(100000, 999999).toString();
};

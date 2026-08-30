import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

import env from "../../config/env.js";
import { User } from "./auth.model.js";
import { Errors } from "../../utils/errors.js";
import { redis } from "../../config/cache.js";

import { createUser, findUserById, updateUser } from "./auth.repository.js";
import { findUserByEmail, findUserByUsername } from "./auth.repository.js";
import { sendDynamicEmail } from "../../utils/emailService.js";
import { generateOtpCode } from "../../utils/otpService.js";

const signToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, env.dbPrivateKey, {
    algorithm: "HS256",
    expiresIn: env.dbExpiredKey,
  });

const toPublicUser = (user) => {
  const { firstName, lastName, email, role, gender, provider, id } = user;
  return { firstName, lastName, email, role, gender, provider, id };
};

export const loginUser = async ({ email, password }) => {
  const existingUser = await findUserByEmail(email);
  if (!existingUser) {
    throw Errors.notFound("User");
  }

  const isMatch = await bcrypt.compare(password, existingUser?.password || "");
  if (!isMatch) {
    throw Errors.authentication("Invalid email or password");
  }

  const token = signToken(existingUser);

  return {
    status: "success",
    message: "User logged in successfully",
    data: { ...toPublicUser(existingUser), token },
  };
};
export const loginWithGoogle = async ({ token }) => {
  const client = new OAuth2Client(env.dbGoogleClientId);

  const decodedData = await client.verifyIdToken({
    idToken: token,
    audience: env.dbGoogleClientId,
  });
  const payload = decodedData.getPayload();

  let existingUser = await findUserByEmail(payload.email);

  if (!existingUser) {
    const newUser = User.fromGoogleProfile(payload);
    existingUser = await createUser(newUser);
  }
  const newToken = signToken(existingUser);

  return {
    status: "success",
    message: "User logged in successfully",
    data: { ...toPublicUser(existingUser), token: newToken },
  };
};

export const registerUser = async ({
  email,
  firstName,
  lastName,
  username,
  password,
}) => {
  const existingUserByEmail = await findUserByEmail(email);
  if (existingUserByEmail) {
    throw Errors.conflict("User with this email already exists");
  }

  const existingUserByUsername = await findUserByUsername(username);
  if (existingUserByUsername) {
    throw Errors.conflict(
      "this username already taken, please choose another one",
    );
  }

  const hashPassword = await bcrypt.hash(password, 10);
  if (!hashPassword) {
    throw Errors.internal("Error occurred");
  }

  const newUser = User.fromLocalSignup({
    email,
    lastName,
    username,
    firstName,
    hashedPassword: hashPassword,
  });

  const user = await createUser(newUser);
  if (!user) {
    throw Errors.internal("Error occurred while creating user");
  }

  return {
    status: "success",
    message: "User registered successfully",
    data: { ...toPublicUser(user) },
  };
};

export const getMe = async ({ user: { id } }) => {
  const existingUserById = await findUserById(id);
  if (!existingUserById) {
    throw Errors.notFound("User");
  }

  return {
    status: "success",
    message: "User retrieved successfully",
    data: { ...toPublicUser(existingUserById) },
  };
};

export const forgetPassword = async ({ body: { email } }) => {
  const existingUserByEmail = await findUserByEmail(email);
  if (!existingUserByEmail) {
    throw Errors.notFound("User");
  }

  const code = generateOtpCode();
  const key = `otp:${email}`;
  await redis.set(key, code, "EX", 120);

  const emailResult = await sendDynamicEmail(email, "OTP", {
    otpCode: code,
    expiresInMinutes: 2,
  });
  if (!emailResult.success) {
    throw Errors.externalApi("Email provider");
  }
  return {
    status: "success",
    message: "User founded",
    data: { ...toPublicUser(existingUserByEmail) },
  };
};

export const regenerateOtp = async ({ body: { email } }) => {
  const code = generateOtpCode();
  const key = `otp:${email}`;
  await redis.set(key, code, "EX", 120);

  const emailResult = await sendDynamicEmail(email, "OTP", {
    otpCode: code,
    expiresInMinutes: 2,
  });
  if (!emailResult.success) {
    throw Errors.externalApi("Email provider");
  }

  return { status: "success", message: "opt created successfully" };
};

export const verifyOtp = async ({ body: { email, otpCode } }) => {
  const key = `otp:${email}`;

  const storedOtp = await redis.get(key);
  if (!storedOtp) {
    throw Errors.badRequest("Verification code has expired or was not found.");
  }
  if (+storedOtp !== +otpCode) {
    throw Errors.badRequest("Invalid verification code.");
  }

  await redis.del(key);

  return { status: "success", message: "Email verified successfully." };
};

export const resetPassword = async ({ body: { email, newPassword } }) => {
  const existingUserByEmail = await findUserByEmail(email);
  if (!existingUserByEmail) {
    throw Errors.notFound("User");
  }
  const hashPassword = await bcrypt.hash(newPassword, 10);
  if (!hashPassword) {
    throw Errors.internal("Error occurred");
  }

  await updateUser({ email, password: hashPassword });

  return {
    status: "success",
    message: "Password updated successfully.",
  };
};

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

import env from "../../config/env.js";
import { User } from "./auth.model.js";
import { Errors } from "../../utils/errors.js";

import { createUser, findUserById } from "./auth.repository.js";
import { findUserByEmail, findUserByUsername } from "./auth.repository.js";

const signToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, env.dbPrivateKey, {
    algorithm: "HS256",
    expiresIn: env.dbExpiredKey,
  });

const toPublicUser = (user) => {
  const { first_name, last_name, email, role, gender, provider, id } = user;
  return { first_name, last_name, email, role, gender, provider, id };
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

export const registerUser = async ({ email, fullName, username, password }) => {
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

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    throw Errors.internal("Error occurred");
  }

  const newUser = User.fromLocalSignup({
    email,
    username,
    hashedPassword: hashPassword,
    fullName,
  });
  const user = await createUser(newUser);
  if (!user) {
    throw Errors.internal("Error occurred while creating user");
  }

  const token = signToken(user);

  return {
    status: "success",
    message: "User registered successfully",
    data: { ...toPublicUser(user), token },
  };
};

export const getMe = async (req) => {
  const { id } = req.user;
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

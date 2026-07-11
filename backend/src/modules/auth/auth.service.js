import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import { Errors } from "../../utils/errors.js";
import { createUser, findUserById } from "./auth.repository.js";
import { findUserByEmail, findUserByUsername } from "./auth.repository.js";

export const loginUser = async ({ email, password }) => {
  const existingUser = findUserByEmail(email);

  if (!existingUser) {
    throw Errors.notFound("User");
  }
  const isMatch = await bcrypt.compare(password, existingUser?.password || "");
  if (!isMatch) {
    throw Errors.authentication("Invalid email or password");
  }

  const token = jwt.sign(
    { id: existingUser.id, role: existingUser.role },
    env.dbPrivateKey,
    {
      algorithm: "HS256",
      expiresIn: env.dbExpiredKey,
    },
  );

  const { fullName, role, gender, id } = existingUser;

  return {
    status: "success",
    message: "User logged in successfully",
    data: { fullName, email, role, gender, id, token },
  };
};

export const registerUser = async ({ email, username, password, ...rest }) => {
  const existingUserByEmail = findUserByEmail(email);
  const existingUserByUsername = findUserByUsername(username);

  if (existingUserByEmail || existingUserByUsername) {
    throw Errors.conflict("User with this email or username already exists");
  }
  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    throw Errors.internal("Error occurred");
  }
  const newUser = {
    id: crypto.randomUUID(),
    ...rest,
    email,
    username,
    password: hashPassword,
    phone: { primary: null, secondary: null, alternate: null, fax: null },
    gender: null,
    role: "manager",
    suite: null,
    createdAt: new Date().toISOString(),
  };

  const user = createUser(newUser);
  if (!user) {
    throw Errors.internal("Error occurred while creating user");
  }
  const token = jwt.sign(
    { id: existingUser.id, role: existingUser.role },
    env.dbPrivateKey,
    {
      algorithm: "HS256",
      expiresIn: env.dbExpiredKey,
    },
  );
  const { fullName, gender, role, id } = user;

  return {
    status: "success",
    message: "User registered successfully",
    data: { fullName, email, gender, role, id, token },
  };
};

export const getMe = (req) => {
  const { id } = req.user;
  const existingUserById = findUserById(id);
  if (!existingUserById) {
    throw Errors.notFound("User");
  }

  const { fullName, email, gender, role } = existingUserById;
  return {
    status: "success",
    message: "user find ^_^",
    data: { fullName, email, gender, role, id },
  };
};

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import { Errors } from "../../utils/errors.js";
import { OAuth2Client } from "google-auth-library";
import { createUser, findUserById } from "./auth.repository.js";
import { findUserByEmail, findUserByUsername } from "./auth.repository.js";

export const loginUser = async ({ email, password }) => {
  const existingUser = await findUserByEmail(email);

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
export const loginWithGoogle = async ({ token }) => {
  const client = new OAuth2Client(env.dbGoogleClientId);

  const decodedData = await client.verifyIdToken({
    idToken: token,
    audience: env.dbGoogleClientId,
  });

  const payload = decodedData.getPayload();
  let existingUser = findUserByEmail(payload.email);

  if (!existingUser) {
    existingUser = await createUser({
      id: crypto.randomUUID(),
      email: payload.email,
      fullName: payload.name,
      role: "manager",
      createdAt: new Date(),
      provider: "google",
    });
  }
  const newToken = jwt.sign(
    { id: existingUser.id, role: existingUser.role },
    env.dbPrivateKey,
    {
      algorithm: "HS256",
      expiresIn: env.dbExpiredKey,
    },
  );

  const { email, role, id, fullName } = existingUser;

  return {
    status: "success",
    message: "User logged in successfully",
    data: { fullName, email, role, id, token: newToken },
  };
};

export const registerUser = async ({ email, fullName, username, password }) => {
  const existingUserByEmail = await findUserByEmail(email);
  const existingUserByUsername = await findUserByUsername(username);

  if (existingUserByEmail) {
    throw Errors.conflict("User with this email already exists");
  }
  if (existingUserByUsername) {
    throw Errors.conflict("User with this username already exists");
  }
  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    throw Errors.internal("Error occurred");
  }

  const newUser = {
    id: crypto.randomUUID(),
    email,
    username,
    password: hashPassword,
    first_name: fullName,
    last_name: "",
    gender: "male",
    role: "manager",
    created_at: new Date(),
  };

  const user = await createUser(newUser);
  if (!user) {
    throw Errors.internal("Error occurred while creating user");
  }
  const token = jwt.sign({ id: user.id, role: user.role }, env.dbPrivateKey, {
    algorithm: "HS256",
    expiresIn: env.dbExpiredKey,
  });
  const { gender, role, id } = user;

  return {
    status: "success",
    message: "User registered successfully",
    data: { fullName, email, gender, role, id, token },
  };
};

export const getMe = async (req) => {
  const { id } = req.user;
  const existingUserById = await findUserById(id);
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

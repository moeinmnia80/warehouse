import bcrypt from "bcrypt";
import { Errors } from "../../utils/errors.js";
import { createUser } from "./auth.repository.js";
import { findUserByEmail, findUserByUsername } from "./auth.repository.js";

export const loginUser = async ({ email, password }) => {
  const existingUser = findUserByEmail(email);

  if (!existingUser) {
    throw Errors.notFound("User");
  }
  const isMatch = await bcrypt.compare(password, existingUser?.password || "");
  if (!isMatch) {
    throw Errors.authentication("Invalid email/username or password");
  }
  const { fullname } = existingUser;

  return {
    status: "success",
    message: "User logged in successfully",
    data: { fullname, email },
  };
};

export const registerUser = async ({ email, username, password, ...rest }) => {
  const existingUserByEmail = await findUserByEmail(email);
  const existingUserByUsername = await findUserByUsername(username);

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
    ...rest,
    email,
    username,
    password: hashPassword,
    id: crypto.randomUUID(),
  };

  const user = createUser(newUser);
  if (!user) {
    throw Errors.internal("Error occurred while creating user");
  }
  delete user.password;
  delete user.id;

  return {
    statusbar: "success",
    message: "User registered successfully",
    data: user,
  };
};

const updateUserProfile = (id, updatedData) => {};

import db from "../../config/db.js";

export const findUserByEmail = (email) =>
  db.user.findUnique({ where: { email } });

export const findUserById = (id) => db.user.findUnique({ where: { id } });

export const findUserByUsername = (username) =>
  db.user.findUnique({ where: { username } });

export const createUser = (newUser) => db.user.create({ data: newUser });

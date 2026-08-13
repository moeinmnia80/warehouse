import sql, { connectDB } from "../../config/db.js";

export const findUserByEmail = async (email) => {
  const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;
  return user;
};
export const findUserById = async (id) => {
  const [user] = await sql`SELECT * FROM users WHERE id = ${id}`;
  return user;
};
export const findUserByUsername = async (username) => {
  const [user] = await sql`SELECT * FROM users WHERE username = ${username}`;
  return user;
};
export const createUser = async (newUser) => {
  const [user] = await sql`INSERT INTO users ${sql(newUser)} RETURNING *`;
  return user;
};

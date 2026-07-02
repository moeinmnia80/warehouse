import { connectDB } from "../../config/db.js";

// login
export const findUserByEmail = (email) => {
  const data = connectDB.readData();
  return data.find((user) => user.email === email) || null;
};
export const findUserById = (id) => {
  const data = connectDB.readData();
  return data.find((user) => user.id === id) || null;
};
export const findUserByUsername = (username) => {
  const data = connectDB.readData();
  return data.find((user) => user.username === username) || null;
};
// register
export const createUser = (newUser) => {
  let data = connectDB.readData();
  data.push(newUser);
  const user = connectDB.writeData(data);

  //* result
  return user[0] || null;
};

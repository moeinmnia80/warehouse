import { connectDB } from "../../config/db.js";

export const findPaymentByUserId = (id) => {
  const data = connectDB.readData("payment");
  return data.find((data) => data.userId === id) || null;
};
export const findAddressByUserId = (id) => {
  const data = connectDB.readData("address");
  return data.filter((data) => data.userId === id) || null;
};

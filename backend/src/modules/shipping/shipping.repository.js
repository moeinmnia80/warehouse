import { connectDB } from "../../config/db.js";

export const findShippingByUserId = (id) => {
  const data = connectDB.readData("shipping");
  return data.find((shipping) => shipping.userId === id) || null;
};
export const findShippingByShippingId = (id) => {
  const data = connectDB.readData("shipping");
  return data.find((suite) => suite.shipmentId === id) || null;
};
export const createNewShipping = (newShippingData) => {
  const data = connectDB.readData("shipping");
  const newData = [...data, newShippingData];
  const suite = connectDB.writeData("shipping", newData);
  return suite[0] || null;
};

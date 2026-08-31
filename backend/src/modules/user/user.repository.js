import db from "../../config/db.js";

export const findPaymentByUserId = (id) =>
  db.userPaymentCard.findMany({ where: { userId: id } });

export const findAddressByUserId = (id) =>
  db.userAddress.findMany({ where: { userId: id } });

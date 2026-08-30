import db from "../../config/db.js";

export const findPaymentByUserId = (id) =>
  db.payment.findUnique({ where: { userId: id } });

export const findAddressByUserId = (id) =>
  db.userAddress.findUnique({ where: { userId: id } });

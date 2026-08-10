import { Errors } from "../../utils/errors.js";
import { findAddressByUserId, findPaymentByUserId } from "./user.repository.js";

export const getUserPaymentMethod = (req) => {
  const { id } = req.user;
  const existingPaymentById = findPaymentByUserId(id);
  if (!existingPaymentById) {
    throw Errors.notFound("User");
  }

  const { paymentMethods } = existingPaymentById;

  return {
    status: "success",
    message: "operation is successfully completed",
    data: [...paymentMethods],
  };
};
export const getUserAddress = (req) => {
  const { id } = req.user;
  const existingAddressById = findAddressByUserId(id);

  if (!existingAddressById) {
    throw Errors.notFound("User");
  }
  return {
    status: "success",
    message: "operation is successfully completed",
    data: [...existingAddressById],
  };
};

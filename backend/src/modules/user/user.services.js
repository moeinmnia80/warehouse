import { Errors } from "../../utils/errors.js";
import { findAddressByUserId, findPaymentByUserId } from "./user.repository.js";

export const getUserPaymentMethod = (req) => {
  const { id } = req.user;

  const existingPaymentById = findPaymentByUserId(id);
  if (!existingPaymentById) {
    throw Errors.notFound("Payment method");
  }

  return {
    status: "success",
    message: "Payment methods retrieved successfully",
    data: existingPaymentById,
  };
};
export const getUserAddress = (req) => {
  const { id } = req.user;

  const existingAddressById = findAddressByUserId(id);
  if (!existingAddressById) {
    throw Errors.notFound("Address");
  }

  return {
    status: "success",
    message: "Address retrieved successfully",
    data: existingAddressById,
  };
};

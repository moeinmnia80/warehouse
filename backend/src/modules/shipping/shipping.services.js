import { Errors } from "../../utils/errors.js";
import env from "../../config/env.js";
import {
  createNewShipping,
  findShippingByShippingId,
  findShippingByUserId,
} from "./shipping.repository.js";

export const getShippingData = (req) => {
  const { id } = req.user;
  const existingShipping = findShippingByUserId(id);

  if (!existingShipping) {
    throw Errors.notFound("there is not any shipment for this user");
  }

  return {
    status: "success",
    message: "shipping  is already exist",
    data: { ...existingShipping },
  };
};
export const createShipping = (req) => {
  const { user, body } = req;
  const existingShipments = findShippingByShippingId(body.shipmentId);

  if (existingShipments) {
    throw Errors.conflict("there is a shipment for this Id.");
  }

  const newShipment = {
    shipmentId: "SHP-" + crypto.randomUUID(),
    userId: user.id,
    carrier: body.vendor,

    status: "register",
    notice: "",
    timestamps: {
      created_at: new Date(),
      shipped_at: null,
      delivered_at: null,
    },
    packages: body.packages,
  };
  const shipping = createNewShipping(newShipment);
  if (!shipping) {
    throw Errors.internal("Error occurred while creating suite");
  }
  return {
    status: "success",
    message: "suite founded successfully",
    data: { ...shipping },
  };
};

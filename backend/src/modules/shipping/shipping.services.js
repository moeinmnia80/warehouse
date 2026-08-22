import { Errors } from "../../utils/errors.js";
import { Shipping } from "./shipping.model.js";

import {
  createNewShipping,
  findShippingByUserId,
  findShippingByShippingId,
} from "./shipping.repository.js";

export const getShippingData = async (req) => {
  const { id } = req.user;

  const existingShipping = await findShippingByUserId(id);
  if (!existingShipping) {
    throw Errors.notFound("there is not any shipment for this user");
  }

  return {
    status: "success",
    message: "shipping  is already exist",
    data: [...existingShipping],
  };
};
export const createShipping = async (req) => {
  const { user, body } = req;

  const newShipment = new Shipping({ userId: user.id, carrier: body.vendor });
  const shipping = await createNewShipping(newShipment);
  if (!shipping) {
    throw Errors.internal("Error occurred while creating suite");
  }

  return {
    status: "success",
    message: "suite founded successfully",
    data: { ...shipping },
  };
};

export const attachInvoice = async (req, file) => {
  const shipment = await findShippingByShippingId(req.params.shipmentId);
  if (!shipment) throw Errors.notFound("shipment not found");

  const savedInvoice = await updateShippingInvoice(shipment.shipmentId, file);

  return {
    status: "success",
    message: "invoice attached successfully",
    data: savedInvoice,
  };
};

export const getInvoicePath = async (req) => {
  const shipment = await findShippingByShippingId(req.params.shipmentId);
  if (!shipment) throw Errors.notFound("shipment not found");

  if (shipment.userId !== req.user.id) {
    throw Errors.forbidden("you cannot access this invoice");
  }

  if (!shipment.invoice) throw Errors.notFound("no invoice uploaded yet");

  return shipment.invoice.url;
};

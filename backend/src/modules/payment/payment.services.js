import Stripe from "stripe";

import env from "../../config/env.js";
import { Errors } from "../../utils/errors.js";
import {
  createUserPaymentCard,
  findAllUserPaymentCards,
  findUserById,
  findUserPaymentCard,
  updateStripeCustomerId,
  updateUserPaymentCardsDefault,
} from "./payment.repository.js";
import { findShippingByShippingId } from "../shipping/shipping.repository.js";

const stripe = new Stripe(env.stripSecretKey);

export const prepareAddCard = async (req) => {
  const { id } = req.user;

  let existUserById = await findUserById(id);
  if (!existUserById || !existUserById.stripeCustomerId) {
    throw Errors.notFound("user/customer id");
  }

  if (!existUserById.stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: existUserById.email,
      name: `${existUserById.firstName} ${existUserById.lastName}`,
      metadata: { userId: id },
    });

    existUserById = await updateStripeCustomerId(id, customer.id);
  }

  const setupIntent = await stripe.setupIntents.create({
    customer: user.stripeCustomerId,
    payment_method_types: ["card"],
  });
  if (!setupIntent) {
    throw Errors.internal("Internal server error when adding card payment");
  }

  return {
    status: "success",
    message: "The card registration authorization was successfully created.",
    data: { clientSecret: setupIntent.client_secret },
  };
};

export const saveCardToDatabase = async (req) => {
  const { id } = req.user;
  const { paymentMethodId, setAsDefault } = req.body;

  // check connection
  try {
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: user.stripeCustomerId,
    });
  } catch (error) {
    if (error.code !== "resource_already_attached") {
      throw error;
    }
  }

  // get safe data from Stripe
  const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

  const brandMap = {
    visa: "VISA",
    mastercard: "MASTERCARD",
    amex: "AMEX",
    discover: "DISCOVER",
  };
  const cardBrand = brandMap[paymentMethod.card.brand] || "UNKNOWN";

  const existingCardsCount = await findAllUserPaymentCards(id);
  const isFirstCard = existingCardsCount.length === 0;

  const shouldBeDefault = isFirstCard || Boolean(setAsDefault);

  if (shouldBeDefault && !isFirstCard) {
    try {
      await updateUserPaymentCardsDefault(id, false);
    } catch (err) {
      throw Errors.internal(err);
    }
  }

  const newCard = await createUserPaymentCard({
    data: {
      userId: id,
      stripePaymentMethodId: paymentMethod.id,
      brand: cardBrand,
      last4: paymentMethod.card.last4,
      expiryMonth: paymentMethod.card.exp_month,
      expiryYear: paymentMethod.card.exp_year,
      isDefault: setAsDefault || false,
    },
  });
  if (!newCard) {
    throw Errors.database("Database operation failed when save card data");
  }

  return {
    status: "success",
    message: "card successfully added to the database",
    data: { ...newCard },
  };
};

export const processPaymentCheckout = async (req) => {
  const { id } = req.user;
  const { paymentCardId, shipmentId } = req.body;

  const [shipment, card] = await Promise.all([
    findShippingByShippingId(shipmentId),
    findUserPaymentCard(paymentCardId, id),
  ]);
  if (!shipment) {
    throw Errors.notFound("shipment");
  }
  if (!card) {
    throw Errors.notFound("card");
  }
  const amount = shipment.packages.reduce((accPkg, pkg) => {
    const packageTotal = pkg.items.reduce(
      (accItem, item) => accItem + Number(item.qty) * Number(item.valuePerUnit),
      0,
    );
    return accPkg + packageTotal;
  }, 0);
  const amountInCents = Math.round(totalAmountInDollars * 100);

  const stripeCustomerId = card.user.stripeCustomerId;
  const stripePaymentMethodId = card.stripePaymentMethodId;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "usd",
    customer: stripeCustomerId,
    payment_method: stripePaymentMethodId,
    off_session: true,
    confirm: true,
  });

  const paymentRecord = await prisma.payment.create({
    data: {
      userId: id,
      paymentMethodId: card.paymentId,
      paymentIntentId: paymentIntent.id,
      amount: amountInCents,
      currency: "usd",
      status: paymentIntent.status === "succeeded" ? "SUCCEEDED" : "PENDING",
    },
  });

  return {
    status: "success",
    message: "Payment was successful.",
    data: { payment: paymentRecord },
  };
};

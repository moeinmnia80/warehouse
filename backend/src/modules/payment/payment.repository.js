import db from "../../config/db.js";

export const findUserById = (id) => db.user.findUnique({ where: { id } });

export const updateStripeCustomerId = (id, customerId) =>
  db.user.update({ where: { id }, data: { stripeCustomerId: customerId } });

export const findUserPaymentCard = (paymentId, userId) =>
  db.userPaymentCard.findUnique({
    where: { paymentId, userId },
    include: {
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });

export const findAllUserPaymentCards = (userId) =>
  db.userPaymentCard.findMany({ where: { userId } });

export const createUserPaymentCard = (data) =>
  db.userPaymentCard.create({ data });

export const updateUserPaymentCardsDefault = (userId, value) =>
  db.userPaymentCard.updateMany({
    where: { userId },
    data: { isDefault: value },
  });

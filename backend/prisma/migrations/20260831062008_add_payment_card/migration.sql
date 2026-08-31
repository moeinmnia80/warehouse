-- CreateEnum
CREATE TYPE "CardBrand" AS ENUM ('VISA', 'MASTERCARD', 'AMEX', 'DISCOVER', 'DINERS_CLUB', 'JCB', 'UNIONPAY', 'UNKNOWN');

-- CreateTable
CREATE TABLE "user_payment_card" (
    "payment_id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "provider_token" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'stripe',
    "brand" "CardBrand" NOT NULL DEFAULT 'UNKNOWN',
    "last4" VARCHAR(4) NOT NULL,
    "exp_month" INTEGER NOT NULL,
    "exp_year" INTEGER NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_payment_card_pkey" PRIMARY KEY ("payment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_payment_card_provider_token_key" ON "user_payment_card"("provider_token");

-- CreateIndex
CREATE INDEX "user_payment_card_user_id_idx" ON "user_payment_card"("user_id");

-- CreateIndex
CREATE INDEX "shippings_user_id_idx" ON "shippings"("user_id");

-- CreateIndex
CREATE INDEX "user_addresses_user_id_idx" ON "user_addresses"("user_id");

-- CreateIndex
CREATE INDEX "user_phones_user_id_idx" ON "user_phones"("user_id");

-- AddForeignKey
ALTER TABLE "user_payment_card" ADD CONSTRAINT "user_payment_card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

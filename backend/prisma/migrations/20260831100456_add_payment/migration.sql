/*
  Warnings:

  - The values [DINERS_CLUB,JCB,UNIONPAY] on the enum `CardBrand` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `provider_token` on the `user_payment_card` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripe_payment_method_id]` on the table `user_payment_card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripe_customer_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripe_payment_method_id` to the `user_payment_card` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCEEDED', 'FAILED', 'REFUNDED', 'CANCELED');

-- AlterEnum
BEGIN;
CREATE TYPE "CardBrand_new" AS ENUM ('VISA', 'MASTERCARD', 'AMEX', 'DISCOVER', 'UNKNOWN');
ALTER TABLE "public"."user_payment_card" ALTER COLUMN "brand" DROP DEFAULT;
ALTER TABLE "user_payment_card" ALTER COLUMN "brand" TYPE "CardBrand_new" USING ("brand"::text::"CardBrand_new");
ALTER TYPE "CardBrand" RENAME TO "CardBrand_old";
ALTER TYPE "CardBrand_new" RENAME TO "CardBrand";
DROP TYPE "public"."CardBrand_old";
ALTER TABLE "user_payment_card" ALTER COLUMN "brand" SET DEFAULT 'UNKNOWN';
COMMIT;

-- DropIndex
DROP INDEX "user_payment_card_provider_token_key";

-- AlterTable
ALTER TABLE "user_payment_card" DROP COLUMN "provider_token",
ADD COLUMN     "stripe_payment_method_id" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "stripe_customer_id" TEXT;

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "payment_intent_id" TEXT NOT NULL,
    "payment_method_id" INTEGER,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "failure_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_payment_intent_id_key" ON "payment"("payment_intent_id");

-- CreateIndex
CREATE INDEX "payment_user_id_idx" ON "payment"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_payment_card_stripe_payment_method_id_key" ON "user_payment_card"("stripe_payment_method_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_customer_id_key" ON "users"("stripe_customer_id");

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "user_payment_card"("payment_id") ON DELETE SET NULL ON UPDATE CASCADE;

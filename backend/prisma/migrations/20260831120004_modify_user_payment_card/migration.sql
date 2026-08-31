/*
  Warnings:

  - You are about to alter the column `payment_intent_id` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `currency` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "payment" ALTER COLUMN "payment_intent_id" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "currency" SET DATA TYPE VARCHAR(10);

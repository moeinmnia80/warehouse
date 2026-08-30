/*
  Warnings:

  - Made the column `package_id` on table `invoices` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "package_id" SET NOT NULL;

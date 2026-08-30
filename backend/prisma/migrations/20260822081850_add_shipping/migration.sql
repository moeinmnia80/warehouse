/*
  Warnings:

  - You are about to drop the `user_address` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('register', 'delivered');

-- DropForeignKey
ALTER TABLE "user_address" DROP CONSTRAINT "user_address_user_id_fkey";

-- DropTable
DROP TABLE "user_address";

-- CreateTable
CREATE TABLE "user_addresses" (
    "address_id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "address_primary" VARCHAR(255) NOT NULL,
    "address_secondary" VARCHAR(255),
    "full_name" VARCHAR(255) NOT NULL,
    "country" VARCHAR(40) NOT NULL,
    "province" VARCHAR(40),
    "city" VARCHAR(40),
    "postal_code" VARCHAR(10) NOT NULL,
    "country_code" VARCHAR(10),
    "phone_number" VARCHAR(20) NOT NULL,

    CONSTRAINT "user_addresses_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "shippings" (
    "shipment_id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "carrier" VARCHAR(20) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'register',
    "notice" VARCHAR(255),
    "description" TEXT,
    "charge" DECIMAL(12,2),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shipped_at" TIMESTAMPTZ(6),
    "delivered_at" TIMESTAMPTZ(6),

    CONSTRAINT "shippings_pkey" PRIMARY KEY ("shipment_id")
);

-- CreateTable
CREATE TABLE "packages" (
    "id" UUID NOT NULL,
    "barcode" VARCHAR(50) NOT NULL,
    "package_id" VARCHAR(50) NOT NULL,
    "shipment_id" VARCHAR(50) NOT NULL,
    "vendor" VARCHAR(50) NOT NULL,
    "data_received" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "item_values" DECIMAL(12,2) NOT NULL,
    "total_values" DECIMAL(12,2) NOT NULL,
    "weight" DECIMAL(10,2) NOT NULL,
    "status_label" VARCHAR(100) NOT NULL,
    "status_details" TEXT,
    "recipient" VARCHAR(255) NOT NULL,
    "address" VARCHAR(500) NOT NULL,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" UUID NOT NULL,
    "item_id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 1,
    "value_per_unit" DECIMAL(12,2) NOT NULL,
    "notice" TEXT,
    "package_id" UUID NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" UUID NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "size" INTEGER NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "package_id" UUID,
    "shipment_id" VARCHAR(50),

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" UUID NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "size" INTEGER NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "package_id" UUID NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_addresses_postal_code_key" ON "user_addresses"("postal_code");

-- CreateIndex
CREATE UNIQUE INDEX "packages_barcode_key" ON "packages"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "packages_package_id_key" ON "packages"("package_id");

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shippings" ADD CONSTRAINT "shippings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "shippings"("shipment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "shippings"("shipment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

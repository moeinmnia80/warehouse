/*
  Warnings:

  - A unique constraint covering the columns `[shipment_id]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "invoices_shipment_id_key" ON "invoices"("shipment_id");

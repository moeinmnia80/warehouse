-- DropForeignKey
ALTER TABLE "packages" DROP CONSTRAINT "packages_shipment_id_fkey";

-- AlterTable
ALTER TABLE "packages" ADD COLUMN     "suite_id" INTEGER;

-- CreateTable
CREATE TABLE "suites" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "zone_prefix" VARCHAR(20) NOT NULL,
    "shelf_number" INTEGER NOT NULL,
    "description" VARCHAR(100),

    CONSTRAINT "suites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_suite_id_fkey" FOREIGN KEY ("suite_id") REFERENCES "suites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "shippings"("shipment_id") ON DELETE SET NULL ON UPDATE CASCADE;

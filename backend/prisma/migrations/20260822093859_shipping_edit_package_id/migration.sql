/*
  Warnings:

  - The primary key for the `packages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `packages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_package_id_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_package_id_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_package_id_fkey";

-- DropIndex
DROP INDEX "packages_package_id_key";

-- AlterTable
ALTER TABLE "images" ALTER COLUMN "package_id" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "package_id" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "items" ALTER COLUMN "package_id" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "packages" DROP CONSTRAINT "packages_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "packages_pkey" PRIMARY KEY ("package_id");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("package_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("package_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("package_id") ON DELETE CASCADE ON UPDATE CASCADE;

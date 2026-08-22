/*
  Warnings:

  - You are about to drop the column `shelf_number` on the `suites` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `suites` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `suites` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "packages" DROP CONSTRAINT "packages_suite_id_fkey";

-- AlterTable
ALTER TABLE "suites" DROP COLUMN "shelf_number",
ADD COLUMN     "user_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "suites_user_id_key" ON "suites"("user_id");

-- AddForeignKey
ALTER TABLE "suites" ADD CONSTRAINT "suites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_suite_id_fkey" FOREIGN KEY ("suite_id") REFERENCES "suites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('manager', 'admin');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('local', 'google', 'facebook');

-- CreateEnum
CREATE TYPE "PhoneType" AS ENUM ('primary', 'secondary', 'alternate', 'fax');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'male',
    "role" "Role" NOT NULL DEFAULT 'manager',
    "provider" "Provider" NOT NULL DEFAULT 'local',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_phones" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "phone_type" "PhoneType" NOT NULL DEFAULT 'primary',
    "phone_number" VARCHAR(20) NOT NULL,

    CONSTRAINT "user_phones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_address" (
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

    CONSTRAINT "user_address_pkey" PRIMARY KEY ("address_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_address_postal_code_key" ON "user_address"("postal_code");

-- AddForeignKey
ALTER TABLE "user_phones" ADD CONSTRAINT "user_phones_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

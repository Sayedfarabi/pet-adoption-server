/*
  Warnings:

  - You are about to drop the column `location` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `pets` table. All the data in the column will be lost.
  - Added the required column `current_location` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthStatus` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "HealthStatus" AS ENUM ('VACCINATED', 'NEUTERED');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVATE', 'DEACTIVATE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "location",
DROP COLUMN "type",
ADD COLUMN     "current_location" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "healthStatus" "HealthStatus" NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVATE';

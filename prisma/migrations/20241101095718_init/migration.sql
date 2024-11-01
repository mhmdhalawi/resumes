/*
  Warnings:

  - You are about to drop the column `createdAt` on the `educations` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `educations` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `resumes` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `resumes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `skills` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `skills` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `educations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `resumes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Action" AS ENUM ('BLOCK', 'UNBLOCK');

-- AlterTable
ALTER TABLE "educations" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "experiences" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "resumes" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "skills" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "activitylogs" (
    "id" SERIAL NOT NULL,
    "adminId" TEXT NOT NULL,
    "action" "Action" NOT NULL,
    "affected_user" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activitylogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activitylogs" ADD CONSTRAINT "activitylogs_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

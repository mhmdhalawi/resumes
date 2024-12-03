/*
  Warnings:

  - The primary key for the `activity_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `adminId` on the `activity_logs` table. All the data in the column will be lost.
  - Added the required column `userId` to the `activity_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Action" ADD VALUE 'UPDATE';
ALTER TYPE "Action" ADD VALUE 'CREATE';

-- DropForeignKey
ALTER TABLE "activity_logs" DROP CONSTRAINT "admin";

-- AlterTable
ALTER TABLE "activity_logs" DROP CONSTRAINT "activity_logs_pkey",
DROP COLUMN "adminId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("userId", "affected_id");

-- RenameForeignKey
ALTER TABLE "activity_logs" RENAME CONSTRAINT "resumeId" TO "affectedResumeId";

-- RenameForeignKey
ALTER TABLE "activity_logs" RENAME CONSTRAINT "userId" TO "affectedUserId";

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

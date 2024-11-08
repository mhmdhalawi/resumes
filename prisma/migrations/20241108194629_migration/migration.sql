/*
  Warnings:

  - You are about to drop the column `userId` on the `ResetToken` table. All the data in the column will be lost.
  - Added the required column `email` to the `ResetToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ResetToken" DROP CONSTRAINT "ResetToken_userId_fkey";

-- AlterTable
ALTER TABLE "ResetToken" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;

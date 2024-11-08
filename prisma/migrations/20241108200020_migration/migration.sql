/*
  Warnings:

  - You are about to drop the column `updateda_at` on the `reset_tokens` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `reset_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reset_tokens" DROP COLUMN "updateda_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

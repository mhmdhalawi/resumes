/*
  Warnings:

  - The primary key for the `reset_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "reset_tokens" DROP CONSTRAINT "reset_tokens_pkey",
ADD CONSTRAINT "reset_tokens_pkey" PRIMARY KEY ("email");

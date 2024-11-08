/*
  Warnings:

  - The primary key for the `reset_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[token]` on the table `reset_tokens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `reset_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "reset_tokens" DROP CONSTRAINT "reset_tokens_pkey",
ADD CONSTRAINT "reset_tokens_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "reset_tokens_token_key" ON "reset_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "reset_tokens_email_key" ON "reset_tokens"("email");

/*
  Warnings:

  - The primary key for the `activity_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "activity_logs" DROP CONSTRAINT "activity_logs_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id");

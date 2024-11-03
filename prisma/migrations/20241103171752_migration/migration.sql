/*
  Warnings:

  - Added the required column `address` to the `resumes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `resumes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `resumes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `resumes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "resumes" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

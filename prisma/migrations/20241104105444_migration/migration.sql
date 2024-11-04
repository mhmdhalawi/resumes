/*
  Warnings:

  - You are about to drop the column `endYear` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `startYear` on the `experiences` table. All the data in the column will be lost.
  - Added the required column `end_year` to the `experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_year` to the `experiences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "experiences" DROP COLUMN "endYear",
DROP COLUMN "startYear",
ADD COLUMN     "end_year" INTEGER NOT NULL,
ADD COLUMN     "start_year" INTEGER NOT NULL;

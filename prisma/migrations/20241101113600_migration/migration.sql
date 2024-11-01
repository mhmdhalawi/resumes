/*
  Warnings:

  - The primary key for the `activitylogs` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "activitylogs" DROP CONSTRAINT "activitylogs_pkey",
ADD CONSTRAINT "activitylogs_pkey" PRIMARY KEY ("adminId");

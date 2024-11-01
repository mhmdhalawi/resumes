/*
  Warnings:

  - You are about to drop the column `affected_user` on the `activitylogs` table. All the data in the column will be lost.
  - Added the required column `userId` to the `activitylogs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "activitylogs" DROP CONSTRAINT "activitylogs_affected_user_fkey";

-- AlterTable
ALTER TABLE "activitylogs" DROP COLUMN "affected_user",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "activitylogs" ADD CONSTRAINT "activitylogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

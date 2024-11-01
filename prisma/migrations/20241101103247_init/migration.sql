/*
  Warnings:

  - The values [BLOCK,UNBLOCK] on the enum `Action` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `userId` on the `activitylogs` table. All the data in the column will be lost.
  - Added the required column `affected_entity` to the `activitylogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entity_id` to the `activitylogs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Entity" AS ENUM ('USER', 'RESUME');

-- AlterEnum
BEGIN;
CREATE TYPE "Action_new" AS ENUM ('SUSPEND', 'ACTIVATE', 'DELETE');
ALTER TABLE "activitylogs" ALTER COLUMN "action" TYPE "Action_new" USING ("action"::text::"Action_new");
ALTER TYPE "Action" RENAME TO "Action_old";
ALTER TYPE "Action_new" RENAME TO "Action";
DROP TYPE "Action_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "activitylogs" DROP CONSTRAINT "activitylogs_userId_fkey";

-- AlterTable
ALTER TABLE "activitylogs" DROP COLUMN "userId",
ADD COLUMN     "affected_entity" "Entity" NOT NULL,
ADD COLUMN     "entity_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "activitylogs" ADD CONSTRAINT "activitylogs_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `resumes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `activitylogs` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `resumeId` on the `educations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `resumeId` on the `experiences` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `resumes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `resumeId` on the `skills` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "activitylogs" DROP CONSTRAINT "activitylogs_adminId_fkey";

-- DropForeignKey
ALTER TABLE "educations" DROP CONSTRAINT "educations_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "experiences" DROP CONSTRAINT "experiences_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_resumeId_fkey";

-- AlterTable
ALTER TABLE "educations" DROP COLUMN "resumeId",
ADD COLUMN     "resumeId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "experiences" DROP COLUMN "resumeId",
ADD COLUMN     "resumeId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "resumes" DROP CONSTRAINT "resumes_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "resumes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "skills" DROP COLUMN "resumeId",
ADD COLUMN     "resumeId" UUID NOT NULL;

-- DropTable
DROP TABLE "activitylogs";

-- CreateTable
CREATE TABLE "activity_logs" (
    "adminId" UUID NOT NULL,
    "action" "Action" NOT NULL,
    "affected_entity" "Entity" NOT NULL,
    "affected_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("adminId","affected_id")
);

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "admin" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "user" FOREIGN KEY ("affected_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "resume" FOREIGN KEY ("affected_id") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educations" ADD CONSTRAINT "educations_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resumes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resumes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resumes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

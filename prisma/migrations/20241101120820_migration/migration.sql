-- DropForeignKey
ALTER TABLE "educations" DROP CONSTRAINT "educations_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "experiences" DROP CONSTRAINT "experiences_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_resumeId_fkey";

-- AddForeignKey
ALTER TABLE "educations" ADD CONSTRAINT "educations_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

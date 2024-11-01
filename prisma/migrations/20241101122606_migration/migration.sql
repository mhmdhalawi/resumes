-- RenameForeignKey
ALTER TABLE "activity_logs" RENAME CONSTRAINT "resume" TO "resumeId";

-- RenameForeignKey
ALTER TABLE "activity_logs" RENAME CONSTRAINT "user" TO "userId";

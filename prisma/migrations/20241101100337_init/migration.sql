-- DropForeignKey
ALTER TABLE "activitylogs" DROP CONSTRAINT "activitylogs_adminId_fkey";

-- AddForeignKey
ALTER TABLE "activitylogs" ADD CONSTRAINT "activitylogs_affected_user_fkey" FOREIGN KEY ("affected_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

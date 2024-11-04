import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ResumeModule } from '../resume/resume.module';
import { AdminResumeController } from './admin-resume.controller';

@Module({
  imports: [ResumeModule],
  controllers: [AdminController, AdminResumeController],
  providers: [AdminService],
})
export class AdminModule {}

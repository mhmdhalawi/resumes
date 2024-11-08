import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { PdfService } from './pdf.service';
import { MediaService } from '../media/media.service';
import { AdminResumeController } from './admin.controller';

@Module({
  controllers: [ResumeController, AdminResumeController],
  providers: [ResumeService, PdfService, MediaService],
  exports: [ResumeService, PdfService],
})
export class ResumeModule {}

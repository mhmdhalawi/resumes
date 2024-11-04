import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { PdfService } from './pdf.service';

@Module({
  controllers: [ResumeController],
  providers: [ResumeService, PdfService],
  exports: [ResumeService, PdfService],
})
export class ResumeModule {}

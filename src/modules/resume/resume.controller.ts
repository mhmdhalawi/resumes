import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { UserSession } from '../auth/types/session';
import { UUIDPipe } from 'src/pipes/uuid.pipe';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { PdfService } from './pdf.service';
import { Response } from 'express';
import { ActivityLogInterceptor } from 'src/interceptors/activity-logs.interceptors';

@Controller('resume')
@UseInterceptors(ActivityLogInterceptor)
export class ResumeController {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly pdfService: PdfService,
  ) {}

  @Post()
  create(
    @Session() session: UserSession,
    @Body() createResumeDto: CreateResumeDto,
  ) {
    return this.resumeService.create({
      userId: session.user.id,
      body: createResumeDto,
    });
  }

  @Get()
  findAll(@Session() session: UserSession) {
    return this.resumeService.findAll({
      userId: session.user.id,
    });
  }

  @Get(':id')
  findOne(
    @Param('id', UUIDPipe)
    id: string,
    @Session() session: UserSession,
  ) {
    return this.resumeService.findOne({
      userId: session.user.id,
      id,
    });
  }

  @Patch(':id')
  update(
    @Session() session: UserSession,
    @Param('id', UUIDPipe) id: string,
    @Body() updateResumeDto: UpdateResumeDto,
  ) {
    return this.resumeService.update({
      userId: session.user.id,
      id,
      body: updateResumeDto,
    });
  }

  @Delete(':id')
  async remove(
    @Param('id', UUIDPipe) id: string,
    @Session() session: UserSession,
  ) {
    await this.resumeService.remove({
      userId: session.user.id,
      id,
    });
    return { message: 'Resume deleted successfully' };
  }

  @Get(':id/pdf')
  async downloadResumeAsPdf(
    @Session() session: UserSession,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    // Fetch resume data from the database
    const resume = await this.resumeService.findOne({
      userId: session.user.id,
      id,
    });

    // Generate PDF
    const pdfBuffer = await this.pdfService.generateResumePdf(resume);

    // Set response headers to trigger download
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=resume-${resume.name}.pdf`,
      'Content-Length': pdfBuffer.length,
    });

    return res.send(pdfBuffer);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { UUIDPipe } from 'src/pipes/uuid.pipe';
import { ResumeService } from '../resume/resume.service';
import { CreateResumeDto } from '../resume/dto/create-resume.dto';
import { UpdateResumeDto } from '../resume/dto/update-resume.dto';
import { Response } from 'express';
import { PdfService } from '../resume/pdf.service';
import { Admin } from '../admin/guards/admin.guard';

@Admin()
@Controller('admin/resume')
export class AdminResumeController {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly pdfService: PdfService,
  ) {}

  @Post()
  create(@Body() createResumeDto: CreateResumeDto) {
    return this.resumeService.create({
      userId: createResumeDto.userId,
      body: createResumeDto,
    });
  }

  @Get()
  findAll(
    @Query('q') query?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.resumeService.findAll({
      is_admin: true,
      skip: parseInt(offset) || 0,
      take: parseInt(limit) || undefined,
      orderBy: {
        created_at: 'asc',
      },
      q: query || '',
    });
  }

  @Get(':id')
  findOne(
    @Param('id', UUIDPipe)
    id: string,
  ) {
    return this.resumeService.findOne({
      id,
      is_admin: true,
    });
  }

  @Patch(':id')
  update(
    @Param('id', UUIDPipe) id: string,
    @Body() updateResumeDto: UpdateResumeDto,
  ) {
    return this.resumeService.update({
      id,
      body: updateResumeDto,
      is_admin: true,
    });
  }

  @Delete(':id')
  async remove(@Param('id', UUIDPipe) id: string) {
    await this.resumeService.remove({
      id,
      is_admin: true,
    });
    return { message: 'Resume deleted successfully' };
  }

  @Get(':id/pdf')
  async downloadResumeAsPdf(@Param('id') id: string, @Res() res: Response) {
    // Fetch resume data from the database
    const resume = await this.resumeService.findOne({
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

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UUIDPipe } from 'src/pipes/uuid.pipe';
import { ResumeService } from '../resume/resume.service';
import { CreateResumeDto } from '../resume/dto/create-resume.dto';
import { UpdateResumeDto } from '../resume/dto/update-resume.dto';
import { Admin } from './guards/admin.guard';

@Admin()
@Controller('admin/resume')
export class AdminResumeController {
  constructor(private readonly resumeService: ResumeService) {}

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
}

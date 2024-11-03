import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { SessionUser } from '../auth/types/session';
import { UUIDPipe } from 'src/pipes/uuid.pipe';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  create(@Body() createResumeDto: CreateResumeDto) {
    return this.resumeService.create(createResumeDto);
  }

  @Get()
  findAll(@Session() session: SessionUser) {
    return this.resumeService.findAll(session.user.id);
  }

  @Get(':id')
  findOne(
    @Param('id', UUIDPipe)
    id: string,
    @Session() session: SessionUser,
  ) {
    return this.resumeService.findOne(session.user.id, id);
  }

  @Patch(':id')
  update(
    @Param('id', UUIDPipe) id: string,
    @Body() updateResumeDto: UpdateResumeDto,
  ) {
    return this.resumeService.update(+id, updateResumeDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', UUIDPipe) id: string,
    @Session() session: SessionUser,
  ) {
    await this.resumeService.remove(session.user.id, id);
    return { message: 'Resume deleted successfully' };
  }
}

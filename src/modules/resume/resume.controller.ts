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
import { UserSession } from '../auth/types/session';
import { UUIDPipe } from 'src/pipes/uuid.pipe';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

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
}

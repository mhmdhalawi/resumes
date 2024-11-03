import { Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResumeService {
  constructor(private prismaService: PrismaService) {}
  async create(createResumeDto: CreateResumeDto) {
    console.log(createResumeDto);
    return 'This action adds a new resume';
  }

  async findAll(userId: string) {
    return await this.prismaService.resume.findMany({
      where: {
        userId,
      },
      include: {
        educations: true,
        experiences: true,
        skills: true,
      },
    });
  }

  async findOne(userId: string, id: string) {
    return await this.prismaService.resume.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        educations: true,
        experiences: true,
        skills: true,
      },
    });
  }

  update(id: number, updateResumeDto: UpdateResumeDto) {
    console.log(updateResumeDto);
    return `This action updates a #${id} resume`;
  }

  async remove(userId: string, id: string) {
    await this.prismaService.resume.delete({
      where: {
        id,
        userId,
      },
    });
  }
}

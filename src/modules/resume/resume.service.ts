import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

interface Request {
  userId?: string;
  is_admin?: boolean;
}

interface CreateResume extends Request {
  body: CreateResumeDto;
}
interface FindOneResume extends Request {
  id: string;
}

interface UpdateResume extends Request {
  id: string;
  body: UpdateResumeDto;
}
interface DeleteResume extends Request {
  id: string;
}

@Injectable()
export class ResumeService {
  private readonly includeRelations = {
    educations: true,
    experiences: true,
    projects: true,
    skills: true,
    references: true,
  };

  constructor(private prismaService: PrismaService) {}
  async create({ userId, body }: CreateResume) {
    return await this.prismaService.resume.create({
      data: {
        name: body.name,
        address: body.address,
        email: body.email,
        phone: body.phone,
        educations: {
          create: body.educations,
        },
        experiences: {
          create: body.experiences,
        },
        projects: {
          create: body.projects,
        },
        skills: {
          create: body.skills,
        },
        references: {
          create: body.references,
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: this.includeRelations,
    });
  }

  async findAll({ userId, is_admin = false }: Request) {
    const whereClause = is_admin ? {} : { userId };

    return await this.prismaService.resume.findMany({
      where: whereClause,
      include: this.includeRelations,
    });
  }

  async findOne({ userId, id, is_admin = false }: FindOneResume) {
    const whereClause = is_admin ? { id } : { id, userId };

    const result = await this.prismaService.resume.findUnique({
      where: whereClause,
      include: this.includeRelations,
    });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async update({ userId, id, body, is_admin = false }: UpdateResume) {
    const whereClause = is_admin ? { id } : { id, userId };

    const existingResume = await this.prismaService.resume.findUnique({
      where: whereClause,
      include: this.includeRelations,
    });

    if (!existingResume) {
      throw new NotFoundException('Resume not found');
    }

    return this.prismaService.resume.update({
      where: whereClause,
      data: {
        name: body?.name,
        address: body?.address,
        email: body?.email,
        phone: body?.phone,
        educations: {
          update: body?.educations?.map((education) => ({
            where: { id: education?.id },
            data: education,
          })),
        },
        experiences: {
          updateMany: body?.experiences?.map((experience) => ({
            where: { id: experience?.id },
            data: experience,
          })),
        },
        projects: {
          updateMany: body?.projects?.map((project) => ({
            where: { id: project?.id },
            data: project,
          })),
        },
        skills: {
          updateMany: body?.skills?.map((skill) => ({
            where: { id: skill?.id },
            data: skill,
          })),
        },
        references: {
          updateMany: body?.references?.map((reference) => ({
            where: { id: reference?.id },
            data: reference,
          })),
        },
      },
      include: this.includeRelations,
    });
  }

  async remove({ userId, id, is_admin = false }: DeleteResume) {
    const whereClause = is_admin ? { id } : { id, userId };

    const result = await this.prismaService.resume.findUnique({
      where: whereClause,
    });

    if (!result) {
      throw new NotFoundException();
    }

    await this.prismaService.resume.delete({
      where: whereClause,
    });
  }
}

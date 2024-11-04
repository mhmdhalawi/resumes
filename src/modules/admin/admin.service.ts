import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  async getUsers() {
    // Get all users
    return await this.prismaService.user.findMany();
  }

  async suspendUser(id: string) {
    // Suspend the user with the given ID
    await this.prismaService.user.update({
      where: { id },
      data: { status: 'SUSPENDED' },
    });
  }

  async activateUser(id: string) {
    // Activate the user with the given ID
    await this.prismaService.user.update({
      where: { id },
      data: { status: 'ACTIVE' },
    });
  }

  async deleteUser(id: string) {
    // Delete the user with the given ID
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}

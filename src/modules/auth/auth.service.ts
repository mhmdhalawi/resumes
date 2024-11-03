import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

const saltOrRounds = 10;
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(user: LoginUserDto) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        password: true,
      },
    });

    if (!foundUser) {
      throw new UnauthorizedException('Invalid password');
    }

    if (foundUser.status === 'INACTIVE') {
      throw new UnauthorizedException('You must verify your email address');
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      foundUser.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    delete foundUser.password;
    delete foundUser.status;

    return foundUser;
  }

  async register(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);

    await this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }
}

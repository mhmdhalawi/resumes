import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

import * as crypto from 'crypto';
import { Prisma } from '@prisma/client';

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
    await this.registerToken(user.email);
  }

  private generateTokenAndExpiresAt() {
    return {
      token: crypto.randomBytes(32).toString('hex'),
      expires_at: new Date(new Date().getTime() + 3600000),
    };
  }

  async registerToken(email: string) {
    const { token, expires_at } = this.generateTokenAndExpiresAt();

    // check if email and token exists in reset token table
    const user = await this.prisma.token.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      // Save token to user table
      await this.prisma.token.create({
        data: {
          token,
          email,
          expires_at,
        },
      });
    } else {
      // Update token in reset token table
      await this.prisma.token.update({
        where: {
          email,
        },
        data: {
          token,
          expires_at,
        },
      });
    }

    // Send email with reset password link
    return { message: 'Email verification link sent to your email' };
  }

  async resetPassword(token: string, password: string) {
    // find user query
    const userQuery: Prisma.TokenFindUniqueArgs = {
      where: {
        token,
      },
    };
    const user = await this.prisma.token.findUnique(userQuery);

    if (!user) {
      throw new UnauthorizedException('Invalid reset password link');
    }

    // check if update at is greater than 1 hour
    if (new Date().getTime() - user.expires_at.getTime() > 5000) {
      throw new UnauthorizedException('Reset password link expired');
    }

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const updatePasswordQuery: Prisma.UserUpdateArgs = {
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword,
      },
    };

    await this.prisma.$transaction([
      this.prisma.user.update(updatePasswordQuery),
      this.prisma.token.delete(userQuery),
    ]);

    return { message: 'Password reset successfully' };
  }

  async verifyEmail(token: string) {
    // find user query
    const userQuery: Prisma.TokenFindUniqueArgs = {
      where: {
        token,
      },
    };

    const user = await this.prisma.token.findUnique(userQuery);

    if (!user) {
      throw new UnauthorizedException('Invalid email verification link');
    }

    const updateStatusQuery: Prisma.UserUpdateArgs = {
      where: {
        email: user.email,
      },
      data: {
        status: 'ACTIVE',
      },
    };

    await this.prisma.$transaction([
      this.prisma.user.update(updateStatusQuery),
      this.prisma.token.delete(userQuery),
    ]);

    return { message: 'Email verified successfully' };
  }
}

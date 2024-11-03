import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/decorators/public';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prismaService: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if the route is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // Get user session
    const request: Request = context.switchToHttp().getRequest();
    const user = request.session['user'];

    // Check if user is not authenticated
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    // check if user is inactive or suspended
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        status: true,
      },
    });

    if (foundUser.status !== 'ACTIVE') {
      throw new UnauthorizedException('Unauthorized');
    }

    // User is authenticated
    return true;
  }
}

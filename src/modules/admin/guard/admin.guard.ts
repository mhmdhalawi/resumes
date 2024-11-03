import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get user session
    const request: Request = context.switchToHttp().getRequest();
    const user = request.session['user'];

    // check if user is admin
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        role: true,
        status: true,
      },
    });

    if (foundUser.role !== 'ADMIN') {
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }
}

export function Admin() {
  return applyDecorators(UseGuards(AdminGuard));
}

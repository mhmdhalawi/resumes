import { Body, Controller, Delete, Post, Req, Session } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { UserSession } from './types/session';
import { Public } from 'src/decorators/public';
import { Request } from 'express';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  async login(@Session() session: UserSession, @Body() user: LoginUserDto) {
    const foundUser = await this.authService.login(user);
    session.user = {
      id: foundUser.id,
    };

    return foundUser;
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    await this.authService.register(user);
    return { message: 'User created successfully' };
  }

  @Delete()
  logout(@Req() req: Request) {
    req.session = null; // Clear user session
    return { message: 'Logged out successfully' };
  }
}

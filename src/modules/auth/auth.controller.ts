import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  Session,
} from '@nestjs/common';
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

  @Post('forgot-password')
  async forgotPassword(@Body() user: { email: string }) {
    return this.authService.registerToken(user.email);
  }

  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body() user: { password: string },
  ) {
    return this.authService.resetPassword(token, user.password);
  }

  @Post('send-email-verification')
  async sendEmailVerification(@Body() user: { email: string }) {
    return this.authService.registerToken(user.email);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }
}

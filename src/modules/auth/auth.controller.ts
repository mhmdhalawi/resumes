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
import { PostMarkService } from '../postmark/postmark.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private postmarkService: PostMarkService,
  ) {}
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
    try {
      await Promise.all([
        this.authService.register(user),
        this.authService.registerToken(user.email),
      ]);
      return { message: 'User created successfully' };
    } catch (error) {
      throw new Error('Error during user registration: ' + error.message);
    }
  }

  @Delete()
  logout(@Req() req: Request) {
    req.session = null; // Clear user session
    return { message: 'Logged out successfully' };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() user: { email: string }) {
    const token = await this.authService.registerToken(user.email);

    await this.postmarkService.sendEmailWithTemplate(user.email, 37950348, {
      product_name: user.email,
      action_url: `http://localhost:3000/auth/reset-password?token=${token}`,
    });

    return { message: 'Email sent successfully' };
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
    const token = await this.authService.registerToken(user.email);

    // await this.postmarkService.sendEmail(
    //   user.email,
    //   'Verify your email',
    //   `Click on the following link to verify your email: http://localhost:3000/auth/verify-email?token=${token}`,
    // );

    await this.postmarkService.sendEmailWithTemplate(user.email, 37950349, {
      email: user.email,
      action_url: `http://localhost:3000/auth/verify-email?token=${token}`,
    });

    return { message: 'Email sent successfully' };
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }
}

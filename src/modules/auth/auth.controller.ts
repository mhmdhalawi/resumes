import { Body, Controller, Delete, Post, Session } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { SessionUser } from './types/session';
import { Public } from 'src/decorators/public';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  async login(@Session() session: SessionUser, @Body() user: LoginUserDto) {
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
  logout(@Session() session: SessionUser) {
    session.user = null; // Clear user session
    return { message: 'Logged out successfully' };
  }
}

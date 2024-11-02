import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  async login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }
}

import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  async login(user: LoginUserDto) {
    console.log(user);
    return 'login';
  }

  async register(user: CreateUserDto) {
    console.log(user);
    return 'register';
  }
}

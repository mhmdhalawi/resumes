import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PostMarkModule } from '../postmark/postmark.module';

@Module({
  imports: [PostMarkModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

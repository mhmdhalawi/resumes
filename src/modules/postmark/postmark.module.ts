import { Module } from '@nestjs/common';
import { PostMarkService } from './postmark.service';
import { PostMarkClient } from './postmark.client';

@Module({
  providers: [PostMarkService, PostMarkClient],
  exports: [PostMarkService],
})
export class PostMarkModule {}

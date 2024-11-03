import { BadRequestException, ParseUUIDPipe } from '@nestjs/common';

export class UUIDPipe extends ParseUUIDPipe {
  constructor() {
    super({
      exceptionFactory() {
        throw new BadRequestException('Invalid ID format');
      },
    });
  }
}

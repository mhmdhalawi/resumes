import {
  BadRequestException,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export class ImagePipe extends ParseFilePipe {
  constructor() {
    super({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 1024 * 1024 * 2, // 2MB
        }),

        new FileTypeValidator({
          fileType: /image\/(jpeg)/,
        }),
      ],
      // create custom error message
      exceptionFactory() {
        throw new BadRequestException('Invalid file type or size');
      },
    });
  }
}

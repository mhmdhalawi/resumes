import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export function ImageInterceptor() {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (_, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
          },
        }),
        limits: { fileSize: 1024 * 1024 * 2 },
        fileFilter: (_, file, callback) => {
          if (!file.mimetype.match(/image\/(jpeg)/)) {
            return callback(new Error('Invalid file type'), false);
          }
          callback(null, true);
        },
      }),
    ),
  );
}

import {
  Controller,
  Post,
  Param,
  Delete,
  UploadedFile,
  Get,
  Res,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { ImagePipe } from 'src/pipes/image.pipe';
import { ImageInterceptor } from './image.interceptor';
import { Response } from 'express';

@Controller('upload')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @ImageInterceptor()
  uploadFile(
    @UploadedFile(ImagePipe)
    file: Express.Multer.File,
  ) {
    return this.mediaService.upload(file);
  }

  @Get(':id')
  getFile(@Param('id') id: string, @Res() res: Response) {
    return this.mediaService.getFile(id).pipe(res);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}

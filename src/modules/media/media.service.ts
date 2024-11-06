import { Injectable, NotFoundException } from '@nestjs/common';
import { createReadStream, existsSync, unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class MediaService {
  // Upload Method
  upload(file: Express.Multer.File) {
    const relativePath = file.path.replace(/\\/g, '/').replace('uploads/', '');
    return { message: 'File uploaded successfully', filePath: relativePath };
  }

  remove(id: string) {
    const filePath = this.getFilePath(id);

    // Delete the file
    unlinkSync(filePath);
    return { message: `File with id ${id} has been deleted successfully` };
  }

  getFile(id: string) {
    const filePath = this.getFilePath(id);

    // Return a readable stream of the file
    return createReadStream(filePath);
  }
  getFilePath(id: string) {
    const filePath = join(process.cwd(), 'uploads', id);
    if (!existsSync(filePath)) {
      throw new NotFoundException(`File with id ${id} not found`);
    }

    return filePath;
  }
}

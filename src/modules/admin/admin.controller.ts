import { Controller, Get } from '@nestjs/common';
import { Admin } from './guard/admin.guard';

@Admin()
@Controller('admin')
export class AdminController {
  @Get()
  getAdmin() {
    return { message: 'Admin route' };
  }
}

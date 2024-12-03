import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Admin } from './guards/admin.guard';
import { IDUserDto } from './dto/suspend-user.dto';
import { AdminService } from './admin.service';
import { ActivityLogInterceptor } from 'src/interceptors/activity-logs.interceptors';

@Admin()
@Controller('admin')
@UseInterceptors(ActivityLogInterceptor)
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Get('users')
  async getUsers(@Query('q') query: string) {
    return await this.adminService.getUsers(query);
  }

  @Post('user/suspend')
  async suspendUser(@Body() body: IDUserDto) {
    const user = await this.adminService.suspendUser(body.id);
    return { message: 'User suspended', id: user.id };
  }

  @Post('activate')
  async activateUser(@Body() body: IDUserDto) {
    await this.adminService.activateUser(body.id);
    return { message: 'User activated' };
  }

  @Delete('delete-user')
  async deleteUser(@Body() body: IDUserDto) {
    await this.adminService.deleteUser(body.id);
    return { message: 'User deleted' };
  }

  @Get('statistics')
  async getStatistics() {
    return await this.adminService.getStatistics();
  }
}

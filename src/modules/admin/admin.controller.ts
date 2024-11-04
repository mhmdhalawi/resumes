import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { Admin } from './guards/admin.guard';
import { IDUserDto } from './dto/suspend-user.dto';
import { AdminService } from './admin.service';

@Admin()
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Get('users')
  async getUsers(@Query('q') query: string) {
    return await this.adminService.getUsers(query);
  }

  @Post('suspend')
  async suspendUser(@Body() body: IDUserDto) {
    await this.adminService.suspendUser(body.id);
    return { message: 'User suspended' };
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

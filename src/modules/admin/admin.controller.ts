import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { Admin } from './guards/admin.guard';
import { IDUserDto } from './dto/suspend-user.dto';
import { AdminService } from './admin.service';

@Admin()
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Get('users')
  async getUsers() {
    return await this.adminService.getUsers();
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
}

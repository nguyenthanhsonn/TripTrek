import { Controller, Get, Param, ParseIntPipe, Patch, Req, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  getNotifications(@Req() req) {
    if (req.user.is_admin) {
      // Lấy tất cả thông báo hệ thống (SYSTEM)
      return this.notificationsService.getAllAdminNotifications();
    }
    // User thường
    return this.notificationsService.getNotification(req.user.id);
  }


  @Patch(':id/read')
  @UseGuards(JwtAuthGuard)
  async markAsRead(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return this.notificationsService.markAsRead(req.user.id, id);
  }
}

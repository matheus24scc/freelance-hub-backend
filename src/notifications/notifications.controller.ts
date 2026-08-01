import { Controller, Get, Param, Patch, Body, Request, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async findByUser(@Request() req) {
    return this.notificationsService.findByUser(req.user.id);
  }

  @Get('unread-count')
  async countUnread(@Request() req) {
    const count = await this.notificationsService.countUnread(req.user.id);
    return { count };
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string, @Request() req) {
    const notification = await this.notificationsService.markAsRead(+id);
    // Verify ownership
    if (notification.userId !== req.user.id) {
      throw new Error('Unauthorized');
    }
    return notification;
  }

  @Patch('read-all')
  async markAllAsRead(@Request() req) {
    return this.notificationsService.markAllAsRead(req.user.id);
  }
}
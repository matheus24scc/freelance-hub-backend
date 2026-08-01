import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async create(userId: number, title: string, body: string): Promise<Notification> {
    const notification = this.notificationsRepository.create({
      userId,
      title,
      body,
    });
    return this.notificationsRepository.save(notification);
  }

  async findByUser(userId: number): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: number): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({ where: { id } });
    notification.read = true;
    return this.notificationsRepository.save(notification);
  }

  async markAllAsRead(userId: number): Promise<void> {
    await this.notificationsRepository.update(
      { userId, read: false },
      { read: true },
    );
  }

  async countUnread(userId: number): Promise<number> {
    const count = await this.notificationsRepository.count({
      where: { userId, read: false },
    });
    return count;
  }
}
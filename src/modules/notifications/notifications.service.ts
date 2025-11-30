import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification, NotificationType } from 'src/entities/notifications.entity';
import { DeepPartial, Repository } from 'typeorm';
import { SendNotiDto } from './dto/noti.dto';
import { NotificationGateway } from './notification.gateway';
import User from 'src/entities/user.entity';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification) private readonly notiRepo: Repository<Notification>,
        private readonly notificationGateway: NotificationGateway
    ) { }

    async createAndSend(data: SendNotiDto) {
        if (data.userId == null) throw new BadRequestException("userId is required");

        const notification = this.notiRepo.create({
            user: { id: data.userId },
            sender: data.senderId != null ? ({ id: data.senderId } as User) : undefined,
            title: data.title,
            message: data.message,
            typeNoti: data.type,
            bookingId: data.bookingId,
            tourId: data.tourId,
            isRead: data.isRead ?? false
        } as DeepPartial<Notification>);

        const saved = await this.notiRepo.save(notification);
        this.notificationGateway.sendToUser(data.userId, saved);
        return saved;
    }

    async createAndSendToAdmin(dto: SendNotiDto) {
        const notification = this.notiRepo.create({
            sender: dto.senderId != null ? ({ id: dto.senderId } as User) : undefined,
            title: dto.title,
            message: dto.message,
            typeNoti: dto.type,
            tourId: dto.tourId ?? null,
            bookingId: dto.bookingId ?? null,
            isRead: false,
        } as DeepPartial<Notification>);

        const saved = await this.notiRepo.save(notification);
        this.notificationGateway.sendToAdmin(saved);
        return saved;
    }


    async getNotification(userId: number) {
        return await this.notiRepo.find({
            where: { user: { id: userId } },
            order: { id: "DESC" }
        })
    }

    async getAllAdminNotifications() {
        return await this.notiRepo.find({
            where: { typeNoti: NotificationType.SYSTEM },
            order: { createdAt: "DESC" },
        });
    }
    

    //Đánh dấu là đã đọc
    async markAsRead(userId: number, notiId: number) {
        const noti = await this.notiRepo.findOne({
            where: { id: notiId, user: { id: userId } }
        });
        if (!noti) throw new NotFoundException("Notification not found");
        noti.isRead = true;
        return this.notiRepo.save(noti);
    }
}

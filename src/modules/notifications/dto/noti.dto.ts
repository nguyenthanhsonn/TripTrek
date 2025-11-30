import { NotificationType } from "src/entities/notifications.entity";


export class SendNotiDto{
    userId: number | null;
    senderId?: number;
    title: string;
    message: string;
    type: NotificationType;
    bookingId?: number;
    tourId?: number;
    isRead?: boolean
}
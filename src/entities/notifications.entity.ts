import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";

export enum NotificationType {
    NEW_BOOKING = "NEW_BOOKING",
    BOOKING_STATUS = "BOOKING_STATUS",
    TOUR_APPROVED = "TOUR_APPROVED",
    TOUR_REJECTED = "TOUR_REJECTED",
    SYSTEM = "SYSTEM"
}

@Entity("notifications")
export class Notification {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.notifications, { onDelete: "CASCADE", nullable: true })
    @JoinColumn({name: 'received_id'})
    user: User | null;

    @ManyToOne(() => User, { onDelete: "SET NULL", nullable: true })
    @JoinColumn({name: 'sender_id'})
    sender?: User;

    @Column({type: "enum", enum: NotificationType})
    typeNoti: NotificationType


    @Column({length: 255})
    title: string;

    @Column({type: "text"})
    message: string;

    @Column({nullable: true,name: "tour_id"})
    tourId: number;

    @Column({nullable: true ,name: "booking_id"})
    bookingId: number;

    @Column({ name: "is_read", type: "boolean", default: false })
    isRead: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

}
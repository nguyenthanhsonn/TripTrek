import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";
import { Tour } from "./tour.entity";

export enum BookingStatus{
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    DENY = 'DENY'
}

@Entity('Bookings')
export class Booking{
    @PrimaryGeneratedColumn()
    id: number
    
    //User
    @ManyToOne(() => User, (user) => user.bookings)
    @JoinColumn({name: 'user_id'})
    user: User

    //Tour
    @ManyToOne(() => Tour, (tour) => tour.bookings)
    @JoinColumn({name: 'tour_id'})
    tour: Tour

    @Column({name: 'status', default: BookingStatus.PENDING, type: 'enum', enum: BookingStatus})
    status: BookingStatus

    @Column({type: 'datetime', name: 'start_date'})
    startDate: Date

    @Column({type: 'datetime', name: 'end_date'})
    endDate: Date

    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date
}
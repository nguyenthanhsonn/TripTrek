import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Destination } from "./destination.entity";
import User from "./user.entity";
import { Review } from "./reviews.entity";
import { Booking } from "./booking.entity";

@Entity('Tour')
export class Tour {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column({ type: 'text', })
    description: string
    @Column()
    price: number
    @Column({ type: 'datetime', name: 'start_date' })
    startDate: Date
    @Column({ type: 'datetime', name: 'end_date' })
    endDate: Date
    @ManyToOne(() => Destination, (destination) => destination.id)
    @JoinColumn({ name: 'destination_id' })
    destination: Destination
    @Column('simple-json')
    images: string[]
    @Column({ name: 'guide_name', nullable: true })
    guideName: string
    @Column({name: 'is_deleted', default: false})
    isDeleted: boolean
    @ManyToOne(() => User, (user) => user.tours)
    @JoinColumn({ name: 'created_by_user' })
    createdByUser: User;
    @OneToMany(() => Review, (review) => review.tour)
    reviews: Review[]
    @OneToMany(() => Booking, (b) => b.tour)
    bookings: Booking[]
}
import { Exclude, Expose } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./booking.entity";
import { Tour } from "./tour.entity";

@Entity('Users')
export default class User {
    @Column()
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Expose({ name: 'userName' })
    username: string

    @Column({ unique: true })
    @Expose({ name: 'email' })
    email: string

    @Column({ nullable: true })
    @Expose({ name: 'phone' })
    phone: string

    @Column()
    @Exclude()
    password: string

    @Column({ nullable: true })
    @Expose({ name: 'avatar' })
    avatar: string

    @Column({ default: false })
    is_admin: boolean

    @Column({ type: 'varchar', length: 6, nullable: true })
    @Exclude()
    otp: string | null;

    @Column({ type: 'datetime', nullable: true })
    @Exclude()
    otp_expired: Date | null;

    @OneToMany(() => Booking, (b) => b.user)
    bookings: Booking[]
    @OneToMany(() => Tour, (tour) => tour.createdByUser)
    tours: Tour[];

}
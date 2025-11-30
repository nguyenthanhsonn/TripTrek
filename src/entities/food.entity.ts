import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { Destination } from "./destination.entity";
import { Review } from "./reviews.entity";
import { Image_Foods } from "./images-food.entity";

@Entity('Food')
export class Food {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column({ type: 'text' })
    description: string
    @Column({name: 'is_popular'})
    isPopular: boolean
    @ManyToOne(() => Destination, (destination) => destination.foods)
    @JoinColumn({ name: 'destination_id' })
    destination: Destination
    @OneToMany(() => Review, (review) => review.food)
    reviews: Review[];
    @OneToMany(() => Image_Foods, (imgf)=> imgf.food, {cascade: true})
    images: Image_Foods[];
}
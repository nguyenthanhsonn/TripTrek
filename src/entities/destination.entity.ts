import { Expose } from "class-transformer";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Food } from "./food.entity";
import { Tour } from "./tour.entity";

@Entity('Destinations')
export class Destination{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column({type: 'text'})
    description: string
    @Column({name: 'image_url'})
    imageURL: string
    @Column("simple-json", {name: 'gallery_url', nullable: true})
    galleryURL: string[]
    @Column({ default: false, name: 'is_popular' })
    isPopular: boolean
    @OneToMany(() => Food, (food) => food.destination)
    foods: Food[]
    @OneToMany(() => Tour, (tour) => tour.destination)
    tours: Tour[]
}
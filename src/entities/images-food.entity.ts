import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Food } from "./food.entity";

@Entity('Image_Foods')
export class Image_Foods{
    @PrimaryGeneratedColumn()
    id: number
    @Column('simple-json')
    images: string[]
    @ManyToOne(() => Food, (food)=>food.images, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'food_id'})
    food: Food
}
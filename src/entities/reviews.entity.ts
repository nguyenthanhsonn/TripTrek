import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";
import { Tour } from "./tour.entity";
import { CONFIGURABLE_MODULE_ID } from "@nestjs/common/module-utils/constants";
import { Food } from "./food.entity";

@Entity('Reviews')
export class Review{
    @PrimaryGeneratedColumn()
    id: number

    //User
    @ManyToOne(()=> User, (user)=>user.id, {eager: true})
    @JoinColumn({name: 'user_id'})
    user: User
    
    //Food
    @ManyToOne(()=> Food, (food)=> food.reviews, {nullable: true})
    @JoinColumn({name: 'food_id'})
    food: Food

    //Tour
    @ManyToOne(()=>Tour, (tour)=> tour.reviews, {nullable: true})
    @JoinColumn({name: 'tour_id'})
    tour: Tour

    @Column({type: 'text'})
    rating: number
    @Column()
    comment: string
    @Column({type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date
}
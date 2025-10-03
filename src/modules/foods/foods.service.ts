import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from 'src/entities/food.entity';
import { Image_Foods } from 'src/entities/images-food.entity';
import { Repository } from 'typeorm';
import { FoodByDestId, FoodByPopular, GetFood } from './interface/foodResponse.interface';

@Injectable()
export class FoodsService {
    constructor(
        @InjectRepository(Food) private readonly foodRepo: Repository<Food>,
        @InjectRepository(Image_Foods) private readonly imageFoodRepo: Repository<Image_Foods>,
    ) { }

    async getFoods(): Promise<GetFood[]> {
        const food = await this.foodRepo.find({
            relations: ['destination', 'images']
        });
        return food.map(f => ({
            id: f.id,
            name: f.name,
            description: f.description,
            images: f.images?.map(img => img.images).flat() ?? [],
            isPopular: f.isPopular,
            destination: {
                id: f.destination.id,
                name: f.destination.name
            }
        }))
    }

    async getFoodByPopular(): Promise<FoodByPopular[]> {
        const limit = 10;
        const food = await this.foodRepo.find({
            where: { isPopular: true },
            relations: ['destination', 'images'],
        });
        return food.map(f => ({
            id: f.id,
            name: f.name,
            description: f.description,
            images: f.images?.map(img => img.images).flat() ?? [],
            isPopular: f.isPopular,
            destination: {
                id: f.destination.id,
                name: f.destination.name
            }
        }));
    }

    async getFoodByDestId(destId: number): Promise<FoodByDestId[]>{
        const food = await this.foodRepo.find({
            where: {destination: {id: destId}},
            relations: ['images']
        });
        return food.map(f => ({
            id: f.id,
            name: f.name,
            description: f.description,
            images: f.images?.map(img => img.images).flat() ?? [],
        }));
    }
}

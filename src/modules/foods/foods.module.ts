import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from 'src/entities/food.entity';
import { Review } from 'src/entities/reviews.entity';
import { FoodsController } from './foods.controller';
import { Image_Foods } from 'src/entities/images-food.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Food, Review, Image_Foods])],
  providers: [FoodsService],
  controllers: [FoodsController],
  
})
export class FoodsModule {}

import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/entities/reviews.entity';
import { Tour } from 'src/entities/tour.entity';
import User from 'src/entities/user.entity';
import { Food } from 'src/entities/food.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Tour, User, Food])],
  providers: [ReviewsService],
  controllers: [ReviewsController]
})
export class ReviewsModule {}

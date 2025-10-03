import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/reviews.entity';
import { Repository } from 'typeorm';
import { ReviewResponse } from './interface/reviewResponse.interface';
import { Tour } from 'src/entities/tour.entity';
import User from 'src/entities/user.entity';
import { ReviewDto } from './dto/review.dto';
import { ReviewsByTour } from './interface/reviewsByTour.interface';
import { Food } from 'src/entities/food.entity';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review) private readonly reviewRepo: Repository<Review>,
        @InjectRepository(Tour) private readonly tourRepo: Repository<Tour>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Food) private readonly foodRepo: Repository<Food>,

    ) { }

    async createReviewTour(tourId: number, userId: number, dto: ReviewDto): Promise<ReviewResponse> {
        const tour = await this.tourRepo.findOne({ where: { id: tourId } });
        if (!tour) throw new NotFoundException(`Không tìm thấy tour`);
        //Check User
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException(`Người dùng không tồn tại`);
        //Create new review
        const newReview = await this.reviewRepo.create({
            rating: dto.rating,
            comment: dto.comment,
            user,
            tour
        });
        const saveReview = await this.reviewRepo.save(newReview);
        return {
            id: saveReview.id,
            rating: saveReview.rating,
            comment: saveReview.comment,
            createdAt: new Date(),
            user: {
                id: user.id,
                username: user.username,
                avatar: user.avatar,
            }
        };
    }

    async updateReview(commentId: number, userId: number, dto: ReviewDto): Promise<ReviewResponse> {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('Người dùng không tồn tại');
        const review = await this.reviewRepo.findOne({ where: { id: commentId }, relations: ['user'] });
        if (review?.user.id !== userId) throw new ForbiddenException("Bạn không có quyền chỉnh sửa review này");

        review.comment = dto.comment ?? review.comment;
        review.rating = dto.rating ?? review.rating;
        review.createdAt = new Date();
        await this.reviewRepo.save(review);
        return {
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            createdAt: review.createdAt,
            user: {
                id: user.id,
                username: user.username,
                avatar: user.avatar,
            },
        }
    }

    async deleteReview(commentId: number, userId: number): Promise<{message: string}>{
        const user = await this.userRepo.findOne({where: {id: userId}});
        if(!user) throw new NotFoundException('Người dùng không tồn tại');
        const review = await this.reviewRepo.findOne({where: {id: commentId}, relations: ['user']});
        if(review?.user.id !== userId) throw new ForbiddenException('Bạn không có quyền xoá review này');
        await this.reviewRepo.delete(commentId);
        return {message: 'Đã xoá đánh giá'}
    }

    async getReviewsByTour(tourId: number): Promise<ReviewsByTour[]>{
        const reviews = await this.reviewRepo.find({
            where: { tour: { id: tourId } },
            relations: ['user']
        });
        return reviews.map(review => ({
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            createdAt: review.createdAt,
            user: {
                id: review.user.id,
                username: review.user.username,
                avatar: review.user.avatar,
            },
        }));
    }

    async createReviewForFood(foodId: number, userId: number, dto: ReviewDto): Promise<ReviewResponse> {
        const food = await this.foodRepo.findOne({ where: { id: foodId } });
        if (!food) throw new NotFoundException(`Không tìm thấy món ăn`);
        //Check User
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException(`Người dùng không tồn tại`);
        //Create new review
        const newReview = await this.reviewRepo.create({
            rating: dto.rating,
            comment: dto.comment,
            user,
            food
        });
        const saveReview = await this.reviewRepo.save(newReview);
        return {
            id: saveReview.id,
            rating: saveReview.rating,
            comment: saveReview.comment,
            createdAt: new Date(),
            user: {
                id: user.id,
                username: user.username,
                avatar: user.avatar,
            }
        };
    }

}

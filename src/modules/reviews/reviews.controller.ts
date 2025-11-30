import { Body, Controller, HttpCode, Param, ParseIntPipe, UseGuards, Req, Post, Put, Delete, Get } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReviewDto } from './dto/review.dto';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewService: ReviewsService){}

    @Post('tours/:id')
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    async createReview(@Param('id', ParseIntPipe) id: number, @Body() dto: ReviewDto, @Req() req ){
        const userId = req.user.id;
        return this.reviewService.createReviewTour(id, userId, dto);
    }

    @Put(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async updateReview(@Param('id', ParseIntPipe) id: number, @Body() dto: ReviewDto, @Req() req){
        return this.reviewService.updateReview(id, req.user.id, dto);
    }

    @Delete(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async deleteReview(@Param('id', ParseIntPipe) id: number, @Req() req){
        return this.reviewService.deleteReview(id, req.user.id);
    }

    @Get('tour/:id')
    @HttpCode(200)
    async getReviewsByTourId(@Param('id', ParseIntPipe) id: number){
        return this.reviewService.getReviewsByTour(id);
    }

    @Post('food/:id')
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    async createReviewForFood(@Param('id', ParseIntPipe) id: number, @Body() dto: ReviewDto, @Req() req){
        const userId = req.user.id;
        return this.reviewService.createReviewForFood(id, userId, dto);
    }
}

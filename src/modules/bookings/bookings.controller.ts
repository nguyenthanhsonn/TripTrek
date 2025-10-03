import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ToursService } from '../tours/tours.service';
import { BookingsService } from './bookings.service';
import type { BookTour } from './interface/bookTour_Resquest.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingStatus } from 'src/entities/booking.entity';
import { delayWhen } from 'rxjs';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookTours: BookingsService){}

    // 1. Người dùng xem danh sách booking của chính mình
    @Get('my-bookings')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async getBookingsByUser(@Req() req){
        return this.bookTours.getBookingsByUser(req.user.id)
    }

    // 2. Admin hoặc User xem tất cả booking do mình tạo tour
    @Get('/seller/all')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async getBookingByUser(@Req() req){
        return this.bookTours.getBookingByUserCreated(req.user.id);
    }
    
    // 3. Lấy danh sách booking trong hôm nay (admin thấy tất cả, user chỉ thấy booking tour của mình)
    @Get('today')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async getAllBookingsToDay(@Req() req){
        console.log('User info: ', req.user);
        return this.bookTours.getAllBookingToday(req.user.id, req.user.is_admin === true);
    }

    // 4. Đặt tour (user book theo id tour)
    @Post(':tourId')
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    async bookTour(@Body() dto: BookTour, @Req() req, @Param('tourId', ParseIntPipe) tourId: number){
        return this.bookTours.bookTour(dto, req.user.id, tourId);
    }

    // 5. Cập nhật trạng thái booking (chủ tour)
    @Patch(':bookingId/status')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async updateStatusBooking(@Param('bookingId', ParseIntPipe) bookingId: number, @Body() dto: {status: BookingStatus}, @Req() req){
        return this.bookTours.bookingStatus(req.user.id, bookingId, dto.status);
    } 

    // 6. Xoá booking
    @Delete(':bookingId')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async deleteBooking(@Param('bookingId', ParseIntPipe) bookingId: number, @Req() req){
        return this.bookTours.deleteBooking(bookingId, req.user.id);
    }

    //
    @Delete('seller/deleted')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async deletedBookingByUser(@Body() body: {bookingIds: number[]}, @Req() req){
        return this.bookTours.deleteBookingByUserCreated(req.user.id, body.bookingIds)
    }

}

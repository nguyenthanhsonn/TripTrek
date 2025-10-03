import { Controller, HttpCode, Get, Post, Query, UseGuards, Body, Req, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { ToursService } from './tours.service';
import { SearchDto } from './dto/seachTour.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTour } from './dto/creat-tour.dto';
import type { UpdateTour } from './interface/updateTour.interface';

@Controller('tours')
export class ToursController {
    constructor(private readonly tourService: ToursService){}

    @Get('popular')
    @HttpCode(200)
    async getToursPopular(){
        return this.tourService.getTourPopular();
    }

    @Get('search-tour')
    @HttpCode(200)
    async searchTour(@Query() dto: SearchDto){
        return this.tourService.searchTour(dto);
    }

    @Get('destination/:id')
    @HttpCode(200)
    async getToursByDestId(@Param('id', ParseIntPipe) id: number){
        return this.tourService.getToursByDestId(id);
    }

    @Post('create-tours')
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    async createTour(@Req() req, @Body() dto: CreateTour){
        return this.tourService.createTour(dto, req.user.id)
    }
    
    @Get('my-tours')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async getTourByUser(@Req() req){
        return this.tourService.getTourByUser(Number(req.user.id));
    }

    @Get('all')
    @HttpCode(200)
    async getAllTours(){
        return this.tourService.getAllTours();
    }

    @Get('see/:id')
    @HttpCode(200)
    async getToursData(@Param('id', ParseIntPipe) id: number){
        return this.tourService.getToursData(id);
    }

    @Get('count')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async getCount(@Req() req){
        return this.tourService.getCountTour(req.user.id);
    }

    @Get(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async tourDetail(@Param('id', ParseIntPipe) id: number, @Req() req){
        const currentUserId = req.user.id;
        return this.tourService.getTourById(id, currentUserId);
    }

    @Put(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async updateTour(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTour, @Req() req){
        return this.tourService.updateTour(dto, id, req.user.id);
    }

    @Delete(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async deleteTour(@Param('id', ParseIntPipe) id: number, @Req() req){
        return this.tourService.deleteTour(id, req.user.id)
    }

    
    
}

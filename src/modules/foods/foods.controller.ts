import { Controller, Get, HttpCode, Param, ParseIntPipe } from '@nestjs/common';
import { FoodsService } from './foods.service';

@Controller('foods')
export class FoodsController {
    constructor(private readonly foodService: FoodsService){}

    @Get()
    @HttpCode(200)
    async getFoods(){
        return this.foodService.getFoods();
    }

    @Get('popular')
    @HttpCode(200)
    async getPopularFoods(){
        return this.foodService.getFoodByPopular();
    }

    @Get('destination/:id')
    @HttpCode(200)
    async getFoodByDestId(@Param('id', ParseIntPipe) id: number){
        return this.foodService.getFoodByDestId(id);
    }
}

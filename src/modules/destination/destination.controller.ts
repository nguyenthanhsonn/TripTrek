import { Controller, Get, HttpCode, Param, ParseIntPipe, Query } from '@nestjs/common';
import { DestinationService } from './destination.service';
import SearchDestDTO from './dto/search-dest.dto';

@Controller('destination')
export class DestinationController {
    constructor(private readonly destinationService: DestinationService){}

    @Get('popular')
    @HttpCode(200)
    async getPopularDestinations(){
        return this.destinationService.getPopularDestinations();
    }

    @Get('all')
    @HttpCode(200)
    async getAllDestinations(){
        return this.destinationService.getAllDestinations();
    }

    @Get('search')
    @HttpCode(200)
    async searchDestination(@Query('q') dto: SearchDestDTO){
        return this.destinationService.searchDestinationsByName(dto);
    }

    @Get(':id')
    @HttpCode(200)
    async getDestinationById(@Param('id', ParseIntPipe) id: number){
        return this.destinationService.getDestinationById(id);
    }
}

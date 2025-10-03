import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Destination } from 'src/entities/destination.entity';
import { Like, Repository } from 'typeorm';
import { DestinationPopularResponse } from './interfaces/destination-popular.interface';
import SearchDestDTO from './dto/search-dest.dto';
import { DestResponse } from './interfaces/dest-response.interface';
import { DestResponseById } from './interfaces/dest_responseById.interface';
import { DestAll } from './interfaces/destAll.interface';

@Injectable()
export class DestinationService {
    constructor(@InjectRepository(Destination) private readonly destinationRepo: Repository<Destination>){}

    async getPopularDestinations(): Promise<DestinationPopularResponse[]> {
        const limit = 10;
        const destinations = await this.destinationRepo.find ({
            where: {isPopular: true},
            take: limit
        });
        return destinations.map(dest => ({
            id: dest.id,
            name: dest.name,
            description: dest.description,
            imageURL: dest.imageURL
        }))
    }

    async searchDestinationsByName(dto: SearchDestDTO): Promise<DestResponse[]>{
        return this.destinationRepo.find({
            where: [
                {name: Like(`%${dto}%`)},
            ]
        })
    }

    async getDestinationById(destId: number): Promise<DestResponseById>{
        const dest = await this.destinationRepo.findOne({
            where: {id: destId},
            relations: ['tours']
        });
        if (!dest) {
            throw new Error('Destination not found');
        }
        return {
            id: dest.id,
            name: dest.name,
            description: dest.description,
            imageURL: dest.imageURL,
            galleryURL: dest.galleryURL,
            
        };
    }

    async getAllDestinations(): Promise<DestAll[]>{
        const dest = await this.destinationRepo.find();
        return dest.map(d=>({
            id: d.id,
            name: d.name
        }))
    }

}

import { Module } from '@nestjs/common';
import { DestinationController } from './destination.controller';
import { DestinationService } from './destination.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from 'src/entities/destination.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Destination])],
  providers: [DestinationService],
  controllers: [DestinationController]
})
export class DestinationModule {}

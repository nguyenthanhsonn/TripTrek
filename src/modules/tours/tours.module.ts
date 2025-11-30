import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from 'src/entities/tour.entity';
import { Booking } from 'src/entities/booking.entity';
import { Destination } from 'src/entities/destination.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsModule } from '../notifications/notifications.module';
import User from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tour, Booking, Destination, User]), NotificationsModule],
  controllers: [ToursController],
  providers: [ToursService]
})
export class ToursModule {}

import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeORMError } from 'typeorm/browser';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from 'src/entities/tour.entity';
import { Booking } from 'src/entities/booking.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tour, Booking]), NotificationsModule],
  providers: [BookingsService],
  controllers: [BookingsController]
})
export class BookingsModule {}

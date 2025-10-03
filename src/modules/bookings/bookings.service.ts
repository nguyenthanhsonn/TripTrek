import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking, BookingStatus } from 'src/entities/booking.entity';
import { Between, In, Not, Repository } from 'typeorm';
import {
  BookingToday,
  BookTour,
  GetBooking,
  MyBookingTour,
  Status,
} from './interface/bookTour_Resquest.interface';
import { start } from 'repl';
import { Tour } from 'src/entities/tour.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(Tour) private readonly tourRepo: Repository<Tour>
) {}
  async bookTour(dtoRq: BookTour, userId: number, tourId: number) {
    const newBooking = this.bookingRepo.findOne({
      where: { id: tourId },
    });
    const booking = this.bookingRepo.create({
      tour: { id: tourId },
      user: { id: userId },
      startDate: dtoRq.startDate,
      endDate: dtoRq.endDate,
    });
    const saved = await this.bookingRepo.save(booking);
    return {
      message: 'Đặt tour thành công',
      booking: saved,
    };
  }

  async deleteBooking(bookingId: number, userId: number) {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId, user: { id: userId } },
      relations: ['user'],
    });
    if (!booking) throw new NotFoundException('Không tìm thấy đặt tour');
    if (booking.user.id !== userId)
      throw new ForbiddenException('Bạn không có quyền huỷ đặt tour này');
    await this.bookingRepo.delete(bookingId);
    return { message: 'Huỷ đặt tour thành công' };
  }

  async getBookingsByUser(userId: number): Promise<MyBookingTour[]> {
    const bookings = await this.bookingRepo.find({
      where: { user: { id: userId } },
      relations: ['tour', 'tour.destination'],
    });
    if (!bookings || bookings.length === 0)
      throw new NotFoundException('Không có tour nào được đặt');
    const statusBooking = bookings.filter(
      (b) =>
        b.status !== BookingStatus.DENY && b.status !== BookingStatus.SUCCESS,
    );

    return bookings.map((b) => ({
      id: b.id,
      name: b.tour.name,
      destination: b.tour.destination?.name,
      startDate: b.startDate,
      endDate: b.endDate,
      status: b.status,
      price: b.tour.price,
      images: b.tour.images,
    }));
  }

  async bookingStatus(
    userId: number,
    bookingId: number,
    status: BookingStatus,
  ): Promise<Status> {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
      relations: ['user', 'tour', 'tour.createdByUser'],
    });
    if (!booking) throw new NotFoundException('Booking không tồn tại');
    if (booking.tour.createdByUser.id !== userId) {
      throw new ForbiddenException(
        'Bạn không có quyền thay đổi trạng thái booking này',
      );
    }
    booking.status = status;
    await this.bookingRepo.save(booking);
    return {
      id: booking.id,
      status: booking.status,
      user: {
        id: booking.user.id,
        username: booking.user.username,
      },
      tour: {
        id: booking.tour.id,
        name: booking.tour.name,
      },
    };
  }

  async getAllBookingToday(
    userId: number,
    isAdmin: boolean,
  ): Promise<BookingToday[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const where: any = {
      startDate: Between(today, tomorrow),
    };
    if (!isAdmin) {
      where.tour = {
        createdByUser: { id: userId },
      };
    }
    const bookings = await this.bookingRepo.find({
      where,
      relations: ['tour', 'tour.createdByUser', 'user'], // load các quan hệ cần dùng
    });
    return bookings.map((b) => ({
      id: b.id,
      status: b.status as unknown as BookingToday['status'],
      startDate: b.startDate,
      endDate: b.endDate,
      images: b.tour.images,
      user: {
        id: b.user.id,
        username: b.user.username,
      },
      tour: {
        id: b.tour.id,
        name: b.tour.name,
      },
    }));
  }

  async getBookingByUserCreated(userId: number): Promise<GetBooking[]> {
    const tourBooking = await this.bookingRepo.find({
      where: {
        tour: {
          createdByUser: { id: userId },
        },
      },
      relations: ['tour', 'tour.createdByUser', 'user', 'tour.destination'],
    });
    return tourBooking.map((tb) => ({
      id: tb.id,
      images: tb.tour.images[0],
      name: tb.tour.name,
      price: tb.tour.price,
      startDate: tb.startDate,
      endDate: tb.endDate,
      destination: tb.tour.destination.name,
      status: tb.status,
      userName: tb.user.username,
      phone: tb.user.phone,
      email: tb.user.email,
    }));
  }

  async deleteBookingByUserCreated(userId: number, bookingIds: number[]): Promise<{message: string}> {
    const bookings = await this.bookingRepo.find({
      where: {
        id: In(bookingIds),
        tour: {
          createdByUser: { id: userId },
        },
      },
      relations: ['tour', 'tour.createdByUser'],
    });
    if (!bookings.length) {
      throw new NotFoundException('Không tìm thấy booking nào để xoá');
    }
    const invalid = bookings.find((b) => b.tour.createdByUser.id !== userId);
    if (invalid) {
      throw new ForbiddenException('Bạn không có quyền xoá booking này');
    }
    const idsToDelete = bookings.map((b) => b.id);
    await this.bookingRepo.delete(idsToDelete);

    return { message: 'Xoá thành công' };
  }
}

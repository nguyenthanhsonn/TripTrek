import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { privateDecrypt } from 'crypto';
import { Tour } from 'src/entities/tour.entity';
import { Repository } from 'typeorm';
import {
  MyTourResponse,
  TourOldData,
  TourResponse,
} from './interface/tourResponse.interface';
import SearchDestDTO from '../destination/dto/search-dest.dto';
import { SearchDto } from './dto/seachTour.dto';
import { mapPriceRange } from 'src/utils/price-range.util';
import { CreateTour } from './dto/creat-tour.dto';
import { Destination } from 'src/entities/destination.entity';
import User from 'src/entities/user.entity';
import { SearchTourResponse } from './interface/searchTourResponse.interface';
import { TourDetail } from './interface/tourDetail.interface';
import { UpdateTour } from './interface/updateTour.interface';
import { Booking } from 'src/entities/booking.entity';
import { TourToDest } from './interface/tourToDest.interface';
import { TourByDest } from './interface/tourByDest.interface';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour) private readonly tourRepo: Repository<Tour>,
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(Destination)
    private readonly destRepo: Repository<Destination>,
  ) {}

  async getTourPopular(): Promise<TourResponse[]> {
    const limit = 10;
    const tours = await this.tourRepo.find({
      relations: ['destination'],
      where: {
        destination: {
          isPopular: true,
        },
      },
      take: limit,
    });
    for (let i = tours.length - 1; i > 0; i--) {
      const t = Math.floor(Math.random() * (i + 1));
      [tours[i], tours[t]] = [tours[t], tours[i]];
    }
    return tours.slice(0, 11).map((tour) => ({
      id: tour.id,
      name: tour.name,
      images: tour.images[0] ? [tour.images[0]] : [],
      price: tour.price,
      destination: tour.destination.name,
    }));
  }

  async searchTour(dto: SearchDto): Promise<SearchTourResponse[]> {
    const t = this.tourRepo
      .createQueryBuilder('tour')
      .leftJoinAndSelect('tour.destination', 'destination');

    // Nếu có destination
    if (dto.destination) {
      t.andWhere('destination.id = :destinationId', {
        destinationId: dto.destination,
      });
    }

    // Kiểm tra giá và xử lý khi giá vượt ngoài phạm vi
    let tours: Tour[] = [];

    // Kiểm tra price
    if (dto.price) {
      const { min, max } = mapPriceRange(dto.price);

      // Nếu lọc giá trên 3 triệu
      if (dto.price === 'ABOVE_3M' || min === 3000000) {
        // Lấy các tour trên 3 triệu ở destination (nếu có)
        let above3mTours = await t
          .andWhere('tour.price > :min', { min: 3000000 })
          .getMany();

        // Nếu không có tour trên 3 triệu, lấy các tour dưới 3 triệu ở destination đó
        if (above3mTours.length === 0) {
          // Tạo lại query builder mới để không bị dính điều kiện cũ
          const t2 = this.tourRepo
            .createQueryBuilder('tour')
            .leftJoinAndSelect('tour.destination', 'destination');
          if (dto.destination) {
            t2.andWhere('destination.id = :destinationId', {
              destinationId: dto.destination,
            });
          }
          above3mTours = await t2
            .andWhere('tour.price < :max', { max: 3000000 })
            .getMany();
        }
        tours = above3mTours;
      } else {
        if (min && max) {
          tours = await t
            .andWhere('tour.price BETWEEN :min AND :max', { min, max })
            .getMany();
        } else if (min) {
          tours = await t.andWhere('tour.price >= :min', { min }).getMany();
        } else {
          tours = await t.andWhere('tour.price <= :max', { max }).getMany();
        }
      }
    } else {
      // Nếu không có price, trả về tất cả tour trong destination
      tours = await t.getMany();
    }

    // Kiểm tra nếu không có tour trong destination, trả về thông báo
    if (tours.length === 0 && dto.destination) {
      const destination = await this.destRepo.findOne({
        where: { id: dto.destination },
      });

      if (!destination) {
        throw new NotFoundException('Địa điểm không tồn tại');
      } else {
        throw new NotFoundException(
          `Hiện tại không có tour ở ${destination.name}`,
        );
      }
    }

    // Trả về dữ liệu tours
    return tours.map((t) => ({
      id: t.id,
      name: t.name,
      description: t.description,
      price: t.price,
      startDate: t.startDate,
      endDate: t.endDate,
      destination: t.destination?.name,
      images: t.images ?? [],
    }));
  }

  async createTour(dto: CreateTour, user: User) {
    const tour = this.tourRepo.create({
      name: dto.name,
      description: dto.description,
      startDate: dto.startDate,
      endDate: dto.endDate,
      price: dto.price,
      guideName: dto.guideName,
      images: dto.images,
      destination: { id: dto.destinationId } as Destination,
      createdByUser: user,
    });
    return this.tourRepo.save(tour);
  }

  async updateTour(dto: UpdateTour, id: number, userId: number) {
    const tour = await this.tourRepo.findOne({
      where: { id },
      relations: ['createdByUser', 'destination'],
    });
    if (!tour) throw new NotFoundException(`Không tìm thấy tour`);
    if (tour.createdByUser.id !== userId)
      throw new ForbiddenException(`Bạn không có quyền sửa tour này`);
    Object.assign(tour, dto);
    const updated = await this.tourRepo.save(tour);
    return {
      name: updated.name,
      description: updated.description,
      price: updated.price,
      start_date: updated.startDate,
      end_date: updated.endDate,
      destination_id: updated.destination?.id,
      guide_name: updated.guideName,
      images: updated.images ?? [],
    };
  }

  async getTourById(id: number, currentUserId: number): Promise<TourDetail> {
    const checkTour = await this.tourRepo.findOne({
      where: { id },
      relations: ['destination', 'reviews', 'reviews.user'],
    });
    if (!checkTour) {
      throw new NotFoundException(`Tour with id ${id} not found`);
    }
    return {
      id: checkTour.id,
      name: checkTour.name,
      description: checkTour.description,
      price: checkTour.price,
      startDate: checkTour.startDate,
      endDate: checkTour.endDate,
      destination: checkTour.destination?.name,
      images: checkTour.images,
      guide_name: checkTour.guideName,
      reviews: checkTour.reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        createdAt: r.createdAt,
        user: {
          id: r.user.id,
          username: r.user.username,
          avatar: r.user.avatar,
        },
        isMyComment: r.user.id === currentUserId,
      })),
    };
  }

  async getTourByUser(userId: number): Promise<MyTourResponse[]> {
    // console.log(`UserId ${userId}`);
    const tour = await this.tourRepo.find({
      where: { createdByUser: { id: Number(userId) } },
      relations: ['createdByUser', 'destination'],
    });
    if (!tour) throw new NotFoundException('Không có tour nào');
    return tour.map((t) => ({
      id: t.id,
      name: t.name,
      price: t.price,
      images: t.images[0] ? [t.images[0]] : [],
      destination: t.destination.name,
    }));
  }

  async deleteTour(
    tourId: number,
    userId: number,
  ): Promise<{ message: string }> {
    const tour = await this.tourRepo.findOne({
      where: { id: tourId },
      relations: ['createdByUser'],
    });

    if (!tour) throw new NotFoundException('Tour không tồn tại');
    if (tour.createdByUser.id !== userId) {
      throw new ForbiddenException('Bạn không có quyền xoá tour này');
    }

    // xoá booking liên quan (hard delete)
    await this.bookingRepo.delete({ tour: { id: tourId } });

    // soft delete tour
    tour.isDeleted = true;
    await this.tourRepo.save(tour);

    return { message: 'Đã xoá tour' };
  }

  async getAllTours(): Promise<TourToDest[]> {
    const tours = await this.tourRepo.find({
      where: {isDeleted: false},
      relations: ['destination'],
    });
    if (!tours) throw new NotFoundException('Không có tour nào');
    return tours.map((t) => ({
      id: t.id,
      name: t.name,
      destination: {
        id: t.destination.id,
        name: t.destination.name,
      },
      starDate: t.startDate,
      images: t.images[0] ? [t.images[0]] : [],
      price: t.price,
    }));
  }

  async getToursByDestId(destId: number): Promise<TourByDest[]> {
    const dest = await this.destRepo.findOne({ where: { id: destId } });
    if (!dest) throw new NotFoundException('Không tìm thấy địa điểm này');
    const tours = await this.tourRepo.find({
      where: { destination: { id: destId } },
      relations: ['destination'],
    });
    if (!tours) throw new NotFoundException('Không có tour nào ở địa điểm này');
    return tours.map((t) => ({
      id: t.id,
      name: t.name,
      description: t.description,
      startDate: t.startDate,
      endDate: t.endDate,
      price: t.price,
      guideName: t.guideName,
      images: t.images ?? [],
    }));
  }

  async getToursData(tourId: number): Promise<TourOldData> {
    const tours = await this.tourRepo.findOne({
      where: { id: tourId },
      relations: ['destination'],
    });
    if (!tours) throw new NotFoundException('Tour không tồn tại');
    return {
      name: tours.name,
      description: tours.description,
      startDate: tours.startDate,
      endDate: tours.endDate,
      price: tours.price,
      destination: tours.destination?.id ?? null,
      guideName: tours.guideName,
      images: tours.images,
    };
  }
  async getCountTour(userId: number) {
    const tour = await this.tourRepo.count();
    if (!tour) throw new NotFoundException('Không có tour nào');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tourToday = await this.tourRepo.count({
      where: {
        createdByUser: { id: userId },
      },
      relations: ['createdByUser'],
    });
    if (!tourToday)
      throw new NotFoundException('Không có tour được tạo ngày hôm nay');
    return {
      tongSoTour: tour,
      tourDaTaoHomNay: tourToday,
    };
  }
}

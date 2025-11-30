import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { UserModule } from './modules/user/user.module';
import { DestinationModule } from './modules/destination/destination.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import User from './entities/user.entity';
import { Destination } from './entities/destination.entity';
import { ToursModule } from './modules/tours/tours.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { FoodsController } from './modules/foods/foods.controller';
import { FoodsModule } from './modules/foods/foods.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { Image_Foods } from './entities/images-food.entity';
import { ImageFoodsModule } from './modules/image_foods/image_foods.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: __dirname + '/../public',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Destination], // hoặc để glob pattern: __dirname + '/entities/*{.ts,.js}'
      synchronize: false,            // vì đã dùng migration
      autoLoadEntities: true,        // tự động load entities từ các module con
    }),
    AuthModule,
    MailModule,
    UserModule,
    DestinationModule,
    EventEmitterModule.forRoot(),
    ToursModule,
    ReviewsModule,
    FoodsModule,
    BookingsModule,
    ImageFoodsModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

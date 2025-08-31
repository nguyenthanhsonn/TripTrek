
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntity } from './entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { DestinationsModule } from './modules/destinations/destinations.module';
import User from './entities/user.entity';




@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    MailModule,
    UserModule,
    DestinationsModule,
  ],
  controllers: [UserController],
})
export class AppModule {}

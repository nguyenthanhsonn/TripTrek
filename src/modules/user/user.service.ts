import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import updateProfileDTO from '../auth/dto/updateProfile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/user.entity';
import { Repository, View } from 'typeorm';
import { MailService } from '../mail/mail.service';
import ViewProfile from '../auth/interfaces/viewProfile.interface';
import ViewProfileDTO from './dto/viewProfile.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly user: Repository<User>, private readonly mailService: MailService) { }
    async updateProfile(userId: number, data: updateProfileDTO): Promise<string | User> {
        const user = await this.user.findOne({ where: { id: userId } });
        if (!user) throw new UnauthorizedException('User not found');

        // check trùng username/phone nếu có
        if (data.username || data.phone) {
            const checkData = await this.user.findOne({
                where: [
                    ...(data.username ? [{ username: data.username }] : []),
                    ...(data.phone ? [{ phone: data.phone }] : []),
                ],
            });

            if (checkData && checkData.id !== userId) {
                throw new BadRequestException('Username/Phone đã tồn tại');
            }
        }
        if (data.username) user.username = data.username;
        if (data.phone) user.phone = data.phone;
        if (data.avatar) user.avatar = data.avatar;

        await this.user.save(user);

        return 'Cập nhật thông tin thành công';
    }

    async getProfile(userId: number): Promise<ViewProfileDTO> {
        const user = await this.user.findOne({ where: { id: userId } });
        if (!user) throw new UnauthorizedException('User not found');
        return plainToInstance(ViewProfileDTO, user, { excludeExtraneousValues: true });
    }
}

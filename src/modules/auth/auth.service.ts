import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import RegisterDTO from './dto/register.dto';
import User from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import loginDTO from './dto/login.dto';
import { generateToken } from 'src/utils/generatoken.util';
import loginResponse from './interfaces/loginResponse.interface';
import changePasswordDTO from './dto/changePassword.dto';
import forgotPasswordDTO from './dto/sentOtp.dto';
import { MailService } from '../mail/mail.service';
import resetPasswordDTO from './dto/resetPassword.dto';
import updateProfileDTO from './dto/updateProfile.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly user: Repository<User>, private readonly mailService: MailService) { }

    async register(user: RegisterDTO): Promise<User | null> {
        const uniqueUser = await this.user.find({ where: [{ email: user.email }, { username: user.username }] });
        if (uniqueUser.length > 0) throw new BadRequestException('Eamil/username đã tồn tại');
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);
        const newUser = this.user.create({ ...user, password: hashPassword });
        return await this.user.save(newUser);
    }

    async login(data: loginDTO): Promise<loginResponse | null> {
        const users = await this.user.findOne({ where: { email: data.email } });
        if (!users) throw new UnauthorizedException('Email hoặc password không đúng');
        const isPassword = await bcrypt.compare(data.password, users.password);
        if (!isPassword) throw new UnauthorizedException('Email hoặc password không đúng');
        const token = generateToken(users);
        return {
            id: users.id,
            username: users.username,
            token
        }
    }

    async changePassword(userId: number, data: changePasswordDTO) {
        const user = await this.user.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');
        const isPassword = await bcrypt.compare(data.oldPassword, user.password);
        if (!isPassword) throw new BadRequestException('Mật khẩu cũ không đúng');

        //3. Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.newPassword, salt);

        //4. Update password lên DB
        user.password = hashPassword;
        await this.user.save(user);
        return 'Đổi mật khẩu thành công';
    }

    async forgotPassword(data: forgotPasswordDTO) {
        //Kiem tra email co ton tai khong
        const user = await this.user.findOne({ where: { email: data.email } });
        if (!user) throw new NotFoundException('Email không tồn tại');

        //2. Tao ma OTP
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        const OTPExpired = new Date(new Date().getTime() + 1 * 60000);

        //3. Gui OTP ve email
        user.otp = OTP;
        user.otp_expired = OTPExpired;
        await this.user.save(user);
        return this.mailService.sendOtpMail(data.email, OTP);
    }

    async resetPassword(data: resetPasswordDTO): Promise<string> {
        const user = await this.user.findOne({ where: { email: data.email } });
        if (!user) throw new NotFoundException('Email không tồn tại');
        if (user.otp !== data.otp) throw new BadRequestException('OTP không hợp lệ');
        if (!user.otp_expired || user.otp_expired < new Date()) {
            throw new BadRequestException('OTP đã hết hạn');
        }


        //2. Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.newPassword, salt);

        //3. Update password lên DB
        user.password = hashPassword;
        user.otp = null;
        user.otp_expired = null;
        await this.user.save(user);
        return 'Đặt lại mật khẩu thành công';
    }

    
}

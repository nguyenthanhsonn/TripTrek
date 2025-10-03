import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import RegisterDTO from './dto/register.dto';
import User from 'src/entities/user.entity';
import { Not, Repository } from 'typeorm';
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
import { RegisterResponse } from './interfaces/registerResponse.interface';
import { AllUsers } from './interfaces/viewProfile.interface';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>, private readonly mailService: MailService) { }

    async register(user: RegisterDTO): Promise<RegisterResponse> {
        const uniqueUser = await this.userRepo.find({ where: [{ email: user.email }, { username: user.username }] });
        if (uniqueUser.length > 0) throw new BadRequestException('Email hoặc tên người dùng đã tồn tại');
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);
        const newUser = this.userRepo.create({ ...user, password: hashPassword });
        const saveUser = await this.userRepo.save(newUser);
        return {
            id: saveUser.id,
            email: saveUser.email,
            username: saveUser.username,
            avatar: saveUser.avatar
        }
    }

    async login(data: loginDTO): Promise<loginResponse | null> {
        const users = await this.userRepo.findOne({ where: { email: data.email } });
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
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');
        const isPassword = await bcrypt.compare(data.oldPassword, user.password);
        if (!isPassword) throw new BadRequestException('Mật khẩu cũ không đúng');

        //3. Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.newPassword, salt);

        //4. Update password lên DB
        user.password = hashPassword;
        await this.userRepo.save(user);
        // console.log(user);
        return {message: 'Đổi mật khẩu thành công'};
    }

    async forgotPassword(data: forgotPasswordDTO) {
        //Kiem tra email co ton tai khong
        const user = await this.userRepo.findOne({ where: { email: data.email } });
        if (!user) throw new NotFoundException('Email không tồn tại');

        //2. Tao ma OTP
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        const OTPExpired = new Date(new Date().getTime() + 1 * 60000);

        //3. Gui OTP ve email
        user.otp = OTP;
        user.otp_expired = OTPExpired;
        await this.userRepo.save(user);
        return this.mailService.sendOtpMail(data.email, OTP);
    }

    async resetPassword(data: resetPasswordDTO) {
        const user = await this.userRepo.findOne({ where: { email: data.email } });
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
        await this.userRepo.save(user);
        return {message: 'Đặt lại mật khẩu thành công'};
    }

    async getAllUsers(userId: number, isAdmin: boolean): Promise<AllUsers[]>{
        if(!isAdmin) throw new UnauthorizedException('Bạn không có quyền truy cập');
        const users = await this.userRepo.find({
            where: {id: Not(userId)},
            select: ['id', 'username', 'email', 'avatar']
        });
        return users.map(u => ({
            id: u.id,
            username: u.username,
            email: u.email,
            avatar: u.avatar
        }))
    }
    
}

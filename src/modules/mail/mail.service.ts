import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT ?? '587', 10),
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }

    async sendMail(to: string, subject: string, text: string){
        return await this.transporter.sendMail({
            from: `TripTrek <${process.env.MAIL_USER}>`,
            to,
            subject,
            text,
        });
    }

    async sendOtpMail(to: string, otp: string){
        const subject = 'Mã OTP của bạn';
        return this.sendMail(to, subject, `Mã OTP của bạn là: ${otp}. Mã có hiệu lực trong 1 phút.`);
    }
}

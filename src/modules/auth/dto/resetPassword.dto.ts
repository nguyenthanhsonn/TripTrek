import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export default class resetPasswordDTO{
    @IsString()
    @IsEmail({}, {message: 'Email không hợp lệ'})
    email: string
    @IsString()
    otp: string
    @IsString()
    @IsNotEmpty({message: 'New password is required'})
    newPassword: string
}
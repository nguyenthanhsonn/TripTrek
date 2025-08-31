import { IsEmail, IsString } from "class-validator";


export default class forgotPasswordDTO{
    @IsString()
    @IsEmail({}, {message: 'Email không hợp lệ'})
    email: string
    
}
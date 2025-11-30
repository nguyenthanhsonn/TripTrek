import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class loginDTO{
    @IsString()
    @IsEmail({}, {message: 'Email không hợp lệ'})
    @IsNotEmpty({message: 'Không để trống email'})
    email: string
    @IsString()
    @IsNotEmpty({message: 'Không để trống password'})
    password: string
}
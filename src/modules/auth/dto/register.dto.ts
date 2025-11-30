import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export default class RegisterDTO{
    @IsString()
    @IsNotEmpty({message: 'Không để trống email'})
    email: string
    @IsString()
    @IsNotEmpty({message: 'Không để trống username'})
    username: string
    @IsString()
    @IsNotEmpty({message: 'Không để trống password'})
    @MinLength(6)
    password: string
}
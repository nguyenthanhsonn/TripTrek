import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export default class updateProfileDTO{
    @IsOptional()
  @IsString()
  @IsNotEmpty()
  username?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  avatar?: string;
}
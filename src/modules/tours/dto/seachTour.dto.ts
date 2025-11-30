import { Type } from "class-transformer"
import { IsDateString, IsEnum, IsOptional, IsInt, IsString } from "class-validator"

export enum PriceOption {
  UNDER_1M = 'UNDER_1M',  
  FROM_1M_TO_3M = 'FROM_1M_TO_3M', 
  ABOVE_3M = 'ABOVE_3M',        
}


export class SearchDto{
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    destination: number
    @IsOptional()
    @IsEnum(PriceOption, {message: 'Giá không hợp lệ'})
    price?: PriceOption
}
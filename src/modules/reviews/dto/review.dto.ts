import { IsNumber, IsOptional, IsString, Min, Max } from "class-validator";

export class ReviewDto{
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(5)
    rating?: number
    @IsOptional()
    @IsString()
    comment?: string
}
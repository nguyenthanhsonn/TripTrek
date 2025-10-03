import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTour{
    @IsNotEmpty()
    @IsString()
    name: string
    @IsNotEmpty()
    @IsString()
    description: string
    @IsNotEmpty()
    @IsDateString()
    startDate: string
    @IsNotEmpty()
    @IsDateString()
    endDate: string
    @IsNumber()
    price: number
    @IsNotEmpty()
    @IsNumber()
    destinationId: number
    @IsString()
    guideName?: string
    @IsNotEmpty()
    @IsString({each: true})
    @IsArray()
    images: string[]
}

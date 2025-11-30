import { IsNumber } from "class-validator";


export class BookingParamsDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    bookngId: number;
}

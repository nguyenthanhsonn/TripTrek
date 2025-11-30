import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export default class ViewProfileDTO{
    @ApiProperty() @Expose() username: string | null;
    @ApiProperty() @Expose() email: string | null;
    @ApiProperty() @Expose() phone: string | null;
    @ApiProperty() @Expose() avatar: string | null;
}

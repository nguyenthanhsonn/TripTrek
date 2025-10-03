import { Exclude, Expose } from "class-transformer";

export default class DestinationDTO{
    @Exclude()
    id: number;
    @Expose()
    name: string
    @Expose()
    description: string
    @Expose()
    images: string[];
}
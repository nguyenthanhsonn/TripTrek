import { Destination } from "src/entities/destination.entity";

export interface TourResponse{
    id: number,
    name: string,
    images: string[],
    price: number,
    destination: string
}


export interface MyTourResponse{
    id: number,
    name: string,
    price: number,
    images: string[],
    destination: string
}

export interface TourOldData{
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    price: number,
    destination: number,
    guideName: string,
    images: string[]
}
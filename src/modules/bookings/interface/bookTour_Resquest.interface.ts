import { BookingStatus } from "src/entities/booking.entity"

export interface BookTour{
    startDate: Date
    endDate: Date
}

export interface MyBookingTour{
    id: number,
    name: string,
    destination: string,
    startDate: Date,
    endDate: Date,
    status: BookingStatus,
    price: number,
    images: string[]
}

export interface Status{
    id: number,
    status: BookingStatus,
    user: {
        id: number,
        username: string
    },
    tour: {
        id: number,
        name: string
    }
}

export interface GetBooking{
    id: number,
    images: string,
    name: string,
    price: number,
    destination: string,
    startDate: Date,
    endDate: Date,
    status: BookingStatus,
    userName: string,
    phone: string,
    email: string,
}

export interface BookingToday{
    id: number,
    status: BookingToday,
    startDate: Date,
    endDate: Date,
    images: string[],
    user: {
      id: number,
      username: string,
    },
    tour: {
      id: number,
      name: string,
    }
}
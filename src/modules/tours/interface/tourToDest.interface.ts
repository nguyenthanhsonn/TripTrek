export interface TourToDest{
    id: number,
    name: string,
    destination: {
        id: number,
        name: string
    },
    starDate: Date,
    images: string[],
    price: number
}
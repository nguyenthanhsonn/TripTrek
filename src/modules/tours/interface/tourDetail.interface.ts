

export interface TourDetail{
    id: number,
    name: string,
    description: string,
    price: number,
    startDate: Date,
    endDate: Date,
    destination: string,
    images: string[],
    guide_name: string,
    reviews:{
        id: number,
        rating: number,
        comment: string,
        createdAt: Date,
        user:{
            id: number,
            username: string,
            avatar: string
        };
        isMyComment: boolean
    }[]
}
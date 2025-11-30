
export interface ReviewsByTour{
    id: number,
    rating: number,
    comment: string,
    createdAt: Date,
    user: {
        id: number,
        username: string,
        avatar: string
    }
}
export interface GetFood{
    id: number,
    name: string,
    description: string,
    images: string[],
    isPopular: boolean,
    destination:{
        id: number,
        name: string
    }
}

export interface FoodByPopular{
    id: number,
    name: string,
    description: string,
    images: string[],
    isPopular: boolean,
    destination:{
        id: number,
        name: string
    }
}

export interface FoodByDestId{
    id: number,
    name: string,
    description: string,
    images: string[]
}
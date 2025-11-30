export class TourDTO {
  id: number;
  name: string;
  images: string[];
}
export interface DestResponseById{
    id: number,
    name: string,
    description: string,
    imageURL: string,
    galleryURL: string[],
}
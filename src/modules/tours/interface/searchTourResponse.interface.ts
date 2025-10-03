export interface SearchTourResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  startDate: Date;
  endDate: Date;
  destination: string;   // ✅ thay vì trả full object
  images: string[];
}

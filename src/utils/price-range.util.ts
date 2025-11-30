import { PriceOption } from "src/modules/tours/dto/seachTour.dto";
import { BadRequestException } from "@nestjs/common";

export function mapPriceRange(priceOption: PriceOption): { min?: number; max?: number } {
  switch (priceOption) {
    case PriceOption.UNDER_1M:
      return { max: 1000000 }; // Giá dưới 1 triệu
    case PriceOption.FROM_1M_TO_3M:
      return { min: 1000000, max: 3000000 }; // Giá từ 1 đến 3 triệu
    case PriceOption.ABOVE_3M:
      return { min: 3000000 }; // Giá trên 3 triệu, không giới hạn max
    default:
      throw new BadRequestException('Giá không hợp lệ');
  }
}



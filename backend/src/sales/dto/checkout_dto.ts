import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CheckOutDto {
  @IsNumber()
  @Type(() => Number)
  eventId: number;

  @IsNumber()
  @Type(() => Number)
  quantity: number;
}

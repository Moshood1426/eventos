import { Type } from 'class-transformer';
import { IsString, IsInt, IsNumber } from 'class-validator';

export class GetEventQueryDto {
  @IsString()
  category: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @Type(() => Number)
  date: number;

  @IsString()
  location: string;
}

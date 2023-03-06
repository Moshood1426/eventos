import { Type } from 'class-transformer';
import { IsString, IsInt, IsNumber } from 'class-validator';

export class GetEventQueryDto {
  @IsString()
  category: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsString()
  date: string;

  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsString()
  title: string;
}

import { Type } from 'class-transformer';
import { IsString, Length, IsInt, IsNumber, IsIn, IsDate } from 'class-validator';

export class FavDto {
  @IsNumber()
  @Type(() => Number)
  eventId: number;
}

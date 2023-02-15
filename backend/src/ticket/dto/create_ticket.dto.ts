import { Type } from 'class-transformer';
import { IsString, Length, IsInt, IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @Length(3, 50)
  //min: 3, max: 50
  title: string;

  @IsString()
  description: string;

  @IsInt()
  @Type(() => Number)
  date: number;

  @IsString()
  @Length(3, 50)
  venue: string;

  @IsString()
  @Length(3, 50)
  location: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsString()
  @Length(3, 50)
  host: string;
}

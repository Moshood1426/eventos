import { Type } from 'class-transformer';
import { IsString, Length, IsInt, IsNumber, IsIn } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @Length(3, 50)
  //min: 3, max: 50
  title: string;

  @IsString()
  description: string;

  @IsString()
  date: string;

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

  @IsString()
  @IsIn([
    'Business',
    'Food & Drink',
    'Health',
    'Music',
    'Community',
    'Family & Education',
    'Fashion',
    'Film & Media',
    'Hobbies',
    'Home & Lifestyle',
    'Arts',
    'Science & Tech',
    'Sports & Fitness',
    'Travel & Outdoor',
    'Other',
  ])
  category: string;

  @IsInt()
  @Type(() => Number)
  capacity: number;
}

import { IsString, IsIn, IsNumber } from 'class-validator';

export class UserPayloadDto {
  @IsNumber()
  userId: number;

  @IsString()
  @IsIn(['creator', 'consumer'])
  role: string;
}

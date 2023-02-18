import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(3)
  name: string;
}

import { IsString, IsEmail, IsIn, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6)
  password: string;
}

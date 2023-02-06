import { IsString } from 'class-validator';
import { IsEmail } from 'class-validator/types/decorator/decorators';

export class RegisterUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;
}

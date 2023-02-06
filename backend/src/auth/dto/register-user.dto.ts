import { IsString, IsEmail, IsIn, Length} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @Length(3)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6)
  password: string;

  @IsString()
  @IsIn(['creator', 'consumer'])
  role: string;
}

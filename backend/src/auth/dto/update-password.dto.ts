import { IsString, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  @Length(6)
  newPassword: string;
}

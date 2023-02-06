import { Expose } from 'class-transformer';

export class SerializeUserDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  id: number;

  @Expose()
  role: string;

  @Expose()
  token: string;
}

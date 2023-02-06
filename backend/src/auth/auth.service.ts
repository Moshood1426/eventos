import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity) private readonly authRepo: AuthEntity,
  ) {}

  register() {

  }
}

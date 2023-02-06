import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepo: Repository<AuthEntity>,
  ) {}

  async register(body: RegisterUserDto) {
    const { email, password, role } = body;
    const user = await this.authRepo.findOne({ where: { email } });

    if (user) {
      throw new BadRequestException('User with email exists');
    }

    
  }
}

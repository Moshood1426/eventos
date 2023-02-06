import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepo: Repository<AuthEntity>,
  ) {}

  async register(body: RegisterUserDto) {
    const { email, password: rawPassword, role } = body;
    const userExists = await this.authRepo.findOne({ where: { email } });

    if (userExists) {
      throw new BadRequestException('User with email exists');
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(rawPassword, salt);

    const user = await this.authRepo.create({ ...body, password });
    return this.authRepo.save(user);
  }
}

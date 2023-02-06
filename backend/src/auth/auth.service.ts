import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepo: Repository<AuthEntity>,
    private jwtService: JwtService
  ) {}

  async register(body: RegisterUserDto) {
    const { email, password: rawPassword, role } = body;
    const userExists = await this.authRepo.findOne({ where: { email } });

    if (userExists) {
      throw new BadRequestException('User with email exists');
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(rawPassword, salt);

    const user = this.authRepo.create({ ...body, password });
    const result = await this.authRepo.save(user);
    const token = this.jwtService.sign({id: result.id})

    return { ...result, token }
  }


}

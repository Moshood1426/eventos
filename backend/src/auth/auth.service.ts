import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepo: Repository<AuthEntity>,
    private jwtService: JwtService,
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
    const token = this.jwtService.sign({ id: result.id });

    return { ...result, token };
  }

  async login(body: LoginUserDto) {
    const { email, password } = body;
    const user = await this.authRepo.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('User with email does not exist');
    }

    const confirmPassword = await bcrypt.compare(password, user.password);
    if (!confirmPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const token = this.jwtService.sign({ id: user.id });
    return { ...user, token };
  }
}

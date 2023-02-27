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
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPayloadDto } from './dto/user_payload.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Event } from 'src/event/event.entity';
import { FavoritesService } from 'src/favorites/favorites.service';

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
    const token = this.jwtService.sign({ id: result.id, role: user.role });

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

    const token = this.jwtService.sign({ id: user.id, role: user.role });
    return { ...user, token };
  }

  async updateUser(body: UpdateUserDto, user: UserPayloadDto) {
    const userInfo = await this.authRepo.findOne({
      where: { id: user.userId },
    });

    if (!userInfo) {
      throw new NotFoundException('User with id cannot be found');
    }

    if (body.email !== userInfo.email) {
      const userExists = await this.authRepo.findOne({
        where: { email: body.email },
      });

      if (userExists) {
        throw new BadRequestException('User with email exists');
      }
    }

    userInfo.email = body.email;
    userInfo.name = body.name;

    const userUpdated = await this.authRepo.save(userInfo);
    const token = this.jwtService.sign({
      id: userUpdated.id,
      role: userUpdated.role,
    });
    return { ...userUpdated, token };
  }

  async updatePassword(body: UpdatePasswordDto, user: UserPayloadDto) {
    const { oldPassword, newPassword } = body;
    const userInfo = await this.authRepo.findOne({
      where: { id: user.userId },
    });
    if (!userInfo) {
      throw new NotFoundException('User with id cannot be found');
    }
    console.log(userInfo.password, oldPassword);
    const confirmPassword = await bcrypt.compare(
      oldPassword,
      userInfo.password,
    );
    if (!confirmPassword) {
      throw new BadRequestException('old password is incorrect');
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);
    userInfo.password = password;

    const userUpdated = await this.authRepo.save(userInfo);
    const token = this.jwtService.sign({
      id: userUpdated.id,
      role: userUpdated.role,
    });

    return { ...userUpdated, token };
  }

  async getUser(userId) {
    const user = this.authRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException('user does not exist');
    }

    return user;
  }
}

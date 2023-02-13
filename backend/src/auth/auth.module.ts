import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthEntity } from './auth.entity';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { JwtStrategy } from './jwt/jwt.strategy';


@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity]), JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: jwtConstants.lifetime }
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

@Injectable()
class JwtAuthGuard extends AuthGuard('jwt') {}

export const AuthenticateUser = () => {
    return UseGuards(JwtAuthGuard)
}

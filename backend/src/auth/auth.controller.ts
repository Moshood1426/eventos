import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  registerUser() {}

  @Post('/login')
  loginUser() {}

  @Post('/forgotPassword')
  forgotPassword() {}
}

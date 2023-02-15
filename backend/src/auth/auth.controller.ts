import { Controller, Post, Patch, Body } from '@nestjs/common';
import { SerializeRes } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { SerializeUserDto } from './dto/serialize-user-res.dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @SerializeRes(SerializeUserDto)
  registerUser(@Body() body: RegisterUserDto) {
    return this.authService.register(body);
  }

  @Post('/login')
  @SerializeRes(SerializeUserDto)
  loginUser(@Body() body: LoginUserDto) {
    return this.authService.login(body)
  }

  @Post('/forgotPassword')
  forgotPassword() {}

  @Patch('/updateUser')
  updateUser() {}
}

import { Controller, Post, Patch, Body } from '@nestjs/common';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { SerializeRes } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { SerializeUserDto } from './dto/serialize-user-res.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPayloadDto } from './dto/user_payload.dto';
import { AuthenticateUser } from './jwt/authenticate_user';

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
    return this.authService.login(body);
  }

  @AuthenticateUser()
  @Patch('/update-user')
  updateUser(@Body() body: UpdateUserDto, @CurrentUser() user: UserPayloadDto) {
    return this.authService.updateUser(body, user);
  }

  @AuthenticateUser()
  @Patch('/update-password')
  updatePassword(
    @Body() body: UpdatePasswordDto,
    @CurrentUser() user: UserPayloadDto,
  ) {
    return this.authService.updatePassword(body, user);
  }
}

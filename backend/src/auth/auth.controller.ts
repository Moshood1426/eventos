import { Controller, Post, Patch, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    registerUser(@Body() body: RegisterUserDto) {
      return this.authService.register()
    }

    @Post('/login')
    loginUser() {}

    @Post('/forgotPassword')
    forgotPassword() {}

    @Patch('/updateUser')
    updateUser() {}
}

import { Body, Controller, Post } from '@nestjs/common';
import { UserPayloadDto } from 'src/auth/dto/user_payload.dto';
import { AuthenticateUser } from 'src/auth/jwt/authenticate_user';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { CheckOutDto } from './dto/checkout_dto';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @AuthenticateUser()
  @Post('')
  checkout(@CurrentUser() user: UserPayloadDto, @Body() body: CheckOutDto) {
    
  }
}

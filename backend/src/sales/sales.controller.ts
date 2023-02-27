import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { Request as RequestType } from 'express';
import { UserPayloadDto } from 'src/auth/dto/user_payload.dto';
import { AuthenticateUser } from 'src/auth/jwt/authenticate_user';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { EventService } from 'src/event/event.service';
import { CheckOutDto } from './dto/checkout_dto';
import { SalesService } from './sales.service';

@Controller('api/v1/sales')
export class SalesController {
  constructor(
    private readonly salesService: SalesService,
    private readonly eventService: EventService,
  ) {}

  @AuthenticateUser()
  @Post('/checkout')
  async checkout(
    @CurrentUser() user: UserPayloadDto,
    @Body() body: CheckOutDto,
  ) {
    const event = await this.eventService.getOne(body.eventId);
    return this.salesService.checkoutUser(user, event, body);
  }

  @Post('/webhook')
  async updatePayment(@Request() req: RequestType) {
    return this.salesService.updatePayment(req);
  }

  @AuthenticateUser()
  @Get('/tickets')
  getUserTickets(@CurrentUser() user: UserPayloadDto) {
    const userId = user.userId;
    return this.salesService.getUserTickets(userId);
  }

  
}

import { Controller, Post, Body, Get, Patch } from '@nestjs/common';
import { AuthenticateUser } from 'src/auth/jwt/authenticate_user';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { CreateTicketDto } from './dto/create_ticket.dto';
import { TicketService } from './ticket.service';

@Controller('api/v1/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @AuthenticateUser()
  @Post('')
  createTicket(@CurrentUser() user: { userId: number }) {
    return user;
  }
}

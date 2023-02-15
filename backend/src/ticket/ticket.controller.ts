import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Request,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticateUser } from 'src/auth/jwt/authenticate_user';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { CreateTicketDto } from './dto/create_ticket.dto';
import { TicketService } from './ticket.service';
import { Express } from 'express';

@Controller('api/v1/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @AuthenticateUser()
  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  createTicket(
    @CurrentUser() user: { userId: number },
    @Body() body: CreateTicketDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file.mimetype.startsWith('image')) {
      throw new BadRequestException('File needs to be an image');
    }
    const maxSize = 1024 * 1024 * 4;
    if (file.size > maxSize) {
      throw new BadRequestException('File should be less than 4MB');
    }

    return this.ticketService.create({ file, user, body });
  }
}

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
// import multer from 'multer';
const multer = require("multer")
const path = require('path');

const imgPath = path.join(__dirname, '../public/uploads');
const fileStorage = !multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imgPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.filename + '_' + file.originalname);
  },
});

@Controller('api/v1/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @AuthenticateUser()
  @Post('')
  @UseInterceptors(FileInterceptor('file', { dest: imgPath }))
  createTicket(
    @CurrentUser() user: { userId: number },
    @UploadedFile() file: Express.Multer.File,
    // @Body() body: CreateTicketDto,
  ) {
    if (!file.mimetype.startsWith('image')) {
      throw new BadRequestException('File needs to be an image');
    }
    const maxSize = 1024 * 1024 * 4;
    if (file.size > maxSize) {
      throw new BadRequestException('File should be less than 4MB');
    }

    console.log(file.buffer.toString())
    return this.ticketService.create({ file, user });
  }
}

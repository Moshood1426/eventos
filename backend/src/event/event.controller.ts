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
  Query,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticateUser } from 'src/auth/jwt/authenticate_user';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { CreateEventDto } from './dto/create_event.dto';
import { EventService } from './event.service';
import { Express } from 'express';
import { UserPayloadDto } from 'src/auth/dto/user_payload.dto';
import { GetEventQueryDto } from './dto/get_event_query.dto';

@Controller('api/v1/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @AuthenticateUser()
  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  createEvent(
    @CurrentUser() user: UserPayloadDto,
    @Body() body: CreateEventDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file.mimetype.startsWith('image')) {
      throw new BadRequestException('File needs to be an image');
    }
    const maxSize = 1024 * 1024 * 4;
    if (file.size > maxSize) {
      throw new BadRequestException('File should be less than 4MB');
    }

    return this.eventService.create({ file, user, body });
  }

  @Get('')
  getAllEvents(@Query() query: GetEventQueryDto) {
    return this.eventService.getAll(query);
  }

  @AuthenticateUser()
  @Get('/user')
  getUserEvents(@CurrentUser() user: UserPayloadDto) {
    return this.eventService.getUserEvents(user);
  }

  @Get('/:id')
  getSingleEvent(@Param('id') eventId: string) {
    if (typeof +eventId !== 'number') {
      throw new NotFoundException('Event with id not found');
    }
    return this.eventService.getOne(+eventId);
  }

  @AuthenticateUser()
  @Patch('/:id')
  updateEvent(
    @Param('id') eventId: string,
    @CurrentUser() user: UserPayloadDto,
    @Body() body: Partial<CreateEventDto>,
  ) {
    const { userId } = user;
    const ctx = { eventId: +eventId, userId, body };

    return this.eventService.update(ctx);
  }

  @AuthenticateUser()
  @Delete('/:id')
  deleteEvent(
    @Param('id') eventId: string,
    @CurrentUser() user: UserPayloadDto,
  ) {
    const { userId } = user;

    return this.eventService.delete(+eventId, userId);
  }
}

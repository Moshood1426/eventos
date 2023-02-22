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
import { AuthService } from 'src/auth/auth.service';
import { FavDto } from './dto/fav-event.dto';
import { FavoritesService } from 'src/favorites/favorites.service';

@Controller('api/v1/event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly authService: AuthService,
    private readonly favService: FavoritesService,
  ) {}

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
  async getAllEvents(@Query() query: Partial<GetEventQueryDto>) {
    const favId = await this.favService.getUserFavId(+query.userId);
    return this.eventService.getAll(query, favId);
  }

  @AuthenticateUser()
  @Get('/user')
  getUserEvents(@CurrentUser() user: UserPayloadDto) {
    return this.eventService.getUserEvents(user);
  }

  @AuthenticateUser()
  @Patch('/add-to-fav')
  async addEventToFav(
    @Body() body: FavDto,
    @CurrentUser() user: UserPayloadDto,
  ) {
    const event = await this.eventService.getOne(body.eventId);

    return this.favService.addEventToFav(event, user.userId);
  }

  @AuthenticateUser()
  @Patch('/remove-from-fav')
  async removeEventFromFav(
    @Body() body: FavDto,
    @CurrentUser() user: UserPayloadDto,
  ) {
    const event = await this.eventService.getOne(body.eventId);
    return this.favService.removeEventFromFav(body.eventId, user.userId);
    // return this.authService.removeEventFromFav(body.eventId, user.userId);
  }

  @AuthenticateUser()
  @Get('/get-fav-events')
  async getUserFavEvents(@CurrentUser() user: UserPayloadDto) {
    return this.favService.getUserFavEvents(user.userId);
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

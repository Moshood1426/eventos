import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import path from 'path';
import { AuthEntity } from 'src/auth/auth.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserPayloadDto } from 'src/auth/dto/user_payload.dto';
import { checkPermissions } from 'src/utils/checkPermissions';
import { FindOperator, LessThanOrEqual, Like, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create_event.dto';
import { GetEventQueryDto } from './dto/get_event_query.dto';
import { Event } from './event.entity';
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  //create event
  async create(ctx: {
    body: CreateEventDto;
    file: Express.Multer.File;
    user: UserPayloadDto;
  }) {
    //solve issue of saving image on failed request
    const { file, user, body } = ctx;
    if (user.role !== 'creator') {
      throw new UnauthorizedException('user cannot create event');
    }
    const userInstance = await this.authService.getUser(user.userId);

    cloudinary.config({
      cloud_name: this.configService.get('CLOUD_NAME'),
      api_key: this.configService.get('CLOUD_API_KEY'),
      api_secret: this.configService.get('CLOUD_API_SECRET'),
    });

    const imgURL = await cloudinary.uploader.upload(file.path, {
      use_filename: true,
      folder: 'eventos-app',
    });

    const event = this.eventRepo.create({
      ...body,
      imgPath: imgURL.secure_url,
      createdBy: userInstance,
      createdById: user.userId,
    });

    fs.unlink(file.path, (err: Error) => {
      if (err) {
        throw new BadRequestException('Something went wrong');
      }
    });
    return this.eventRepo.save(event);
  }

  //get all events
  async getAll(query: Partial<GetEventQueryDto>, favId: number | null) {
    const { price, category, date, title, userId } = query;
    let queryObj: {
      price?: FindOperator<number>;
      title?: FindOperator<string>;
      category?: string;
      date?: string;
    } = {};

    if (price) {
      queryObj.price = LessThanOrEqual(price);
    }
    if (title) {
      queryObj.title = Like(`%${title}%`);
    }
    if (category) {
      const newCategory = category.replace('_', '&');
      console.log(newCategory);
      queryObj[`category`] = newCategory;
    }
    if (date) {
      queryObj.date = date;
    }

    let result;
    if (favId) {
      const events = await this.eventRepo.find({
        where: { ...queryObj },
        loadRelationIds: true,
      });

      result = events.map((item) => {
        //@ts-ignore
        if (item.isFavsOf.includes(+favId)) {
          //@ts-ignore
          item.isFavorite = true;
        } else {
          //@ts-ignore
          item.isFavorite = false;
        }
        delete item.isFavsOf;
        return item;
      });
    } else {
      result = this.eventRepo.find({ where: { ...queryObj } });
    }

    return result;
  }

  //get single event
  async getOne(eventId: number) {
    const event = await this.eventRepo.findOne({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('event with id ' + eventId + ' not found');
    }

    return event;
  }

  //get single user events
  async getUserEvents({ role, userId }) {
    if (role !== 'creator') {
      throw new UnauthorizedException('user not allowed to access this route');
    }

    const events = await this.eventRepo.find({
      //@ts-ignore
      where: { createdById: userId },
      loadRelationIds: true,
    });

    if (!events) {
      throw new NotFoundException('User has no active events');
    }

    return events;
  }

  //update user events
  async update(ctx: {
    eventId: number;
    userId: number;
    body: Partial<CreateEventDto>;
  }) {
    const { eventId, userId, body } = ctx;

    const event = await this.eventRepo.findOne({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('event with id ' + eventId + ' not found');
    }
    checkPermissions(event.createdById, userId);

    for (let item in body) {
      if (event[item] !== body[item]) {
        event[item] = body[item];
      }
    }

    return this.eventRepo.save(event);
  }

  // delete user events
  async delete(eventId: number, userId: number) {
    const event = await this.eventRepo.findOne({
      where: { id: eventId },
      loadRelationIds: true,
    });
    if (!event) {
      throw new NotFoundException('event with id ' + eventId + ' not found');
    }
    checkPermissions(event.createdById, userId);
    const imgLink = event.imgPath;
    //remove event image
    await this.eventRepo.remove(event);

    fs.unlink(imgLink, (err: Error) => {
      if (err) {
        throw new BadRequestException('Something went wrong');
      }
    });

    return { msg: 'Event deleted succesfully' };
  }
}

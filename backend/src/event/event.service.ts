import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import path from 'path';
import { UserPayloadDto } from 'src/auth/dto/user_payload.dto';
import { checkPermissions } from 'src/utils/checkPermissions';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create_event.dto';
import { GetEventQueryDto } from './dto/get_event_query.dto';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
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

    const event = this.eventRepo.create({
      ...body,
      imgPath: file.path,
      createdBy: user.userId,
    });

    return this.eventRepo.save(event);
  }

  //get all events
  async getAll(query: Partial<GetEventQueryDto>, favId: number) {
    const { price, category, date, location, userId } = query;

    let result;
    if (favId) {
      const events = await this.eventRepo.find({
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
      result = this.eventRepo.find();
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
    console.log(role, userId)
    if (role !== 'creator') {
      throw new UnauthorizedException('user not allowed to access this route');
    }

    console.log({ createdById: userId })
    const events = await this.eventRepo.find({
      //@ts-ignore
      where: { createdById: 4 },
      loadRelationIds: true,
    });

    console.log(events)

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
      loadRelationIds: true,
    });
    if (!event) {
      throw new NotFoundException('event with id ' + eventId + ' not found');
    }

    checkPermissions(event.createdBy, userId);

    for (let item in body) {
      event[item] = body[item];
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
    checkPermissions(event.createdBy, userId);

    //remove event image
    await this.eventRepo.remove(event);
    return { msg: 'Event deleted succesfully' };
  }
}

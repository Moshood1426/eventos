import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/event/event.entity';
import { Repository } from 'typeorm';
import { Favorites } from './favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favRepo: Repository<Favorites>,
  ) {}

  async getUserFavEvents(userId: number) {
    const userEvents = await this.favRepo.findOne({
      where: { userId: userId },
      loadRelationIds: true
    });

    if (!userEvents || !userEvents.eventIds) {
      throw new NotFoundException('User has no favorites events');
    }

    return userEvents.eventIds;
  }

  async addEventToFav(event: Event, userId: number) {
    let userEvents: Favorites;
    userEvents = await this.favRepo.findOne({
      where: { userId: userId },
      relations: {
        eventIds: true,
      },
    });

    if (!userEvents) {
      userEvents = this.favRepo.create({ userId: userId });
      this.favRepo.save(userEvents);
    }

    if (userEvents.eventIds) {
      const eventIsFav = userEvents.eventIds.find(
        (item) => item.id === event.id,
      );
      if (eventIsFav) {
        throw new BadRequestException('event has been added as favorite');
      }
      userEvents.eventIds = [...userEvents.eventIds, event];
    } else {
      userEvents.eventIds = [event];
    }

    await this.favRepo.save(userEvents);
    return userEvents.eventIds;
  }

  async removeEventFromFav(eventId: number, userId: number) {
    const user = await this.favRepo.findOne({
      where: { userId: userId },
      relations: {
        eventIds: true,
      },
    });

    if (user.eventIds) {
      const eventIsFav = user.eventIds.find((item) => item.id === eventId);
      if (!eventIsFav) {
        throw new BadRequestException('event was never a favorite');
      }

      user.eventIds = user.eventIds.filter((item) => item.id !== eventId);

      await this.favRepo.save(user);
      return user.eventIds;
    } else {
      throw new BadRequestException('event was never a favorite');
    }
  }
}

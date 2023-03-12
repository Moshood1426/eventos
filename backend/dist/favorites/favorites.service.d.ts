import { Event } from 'src/event/event.entity';
import { Repository } from 'typeorm';
import { Favorites } from './favorites.entity';
export declare class FavoritesService {
    private readonly favRepo;
    constructor(favRepo: Repository<Favorites>);
    getUserFavEvents(userId: number): Promise<Event[]>;
    addEventToFav(event: Event, userId: number): Promise<Event[]>;
    removeEventFromFav(eventId: number, userId: number): Promise<Event[]>;
    getUserFavId(userId: number): Promise<number>;
}

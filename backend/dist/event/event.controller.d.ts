/// <reference types="multer" />
import { CreateEventDto } from './dto/create_event.dto';
import { EventService } from './event.service';
import { UserPayloadDto } from 'src/auth/dto/user_payload.dto';
import { GetEventQueryDto } from './dto/get_event_query.dto';
import { AuthService } from 'src/auth/auth.service';
import { FavDto } from './dto/fav-event.dto';
import { FavoritesService } from 'src/favorites/favorites.service';
export declare class EventController {
    private readonly eventService;
    private readonly authService;
    private readonly favService;
    constructor(eventService: EventService, authService: AuthService, favService: FavoritesService);
    createEvent(user: UserPayloadDto, body: CreateEventDto, file: Express.Multer.File): Promise<import("./event.entity").Event>;
    getAllEvents(query: Partial<GetEventQueryDto>): Promise<any>;
    getUserEvents(user: UserPayloadDto): Promise<import("./event.entity").Event[]>;
    addEventToFav(body: FavDto, user: UserPayloadDto): Promise<import("./event.entity").Event[]>;
    removeEventFromFav(body: FavDto, user: UserPayloadDto): Promise<import("./event.entity").Event[]>;
    getUserFavEvents(user: UserPayloadDto): Promise<import("./event.entity").Event[]>;
    getSingleEvent(eventId: string): Promise<import("./event.entity").Event>;
    updateEvent(eventId: string, user: UserPayloadDto, body: Partial<CreateEventDto>): Promise<import("./event.entity").Event>;
    deleteEvent(eventId: string, user: UserPayloadDto): Promise<{
        msg: string;
    }>;
}

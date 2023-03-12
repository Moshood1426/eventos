/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { UserPayloadDto } from 'src/auth/dto/user_payload.dto';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create_event.dto';
import { GetEventQueryDto } from './dto/get_event_query.dto';
import { Event } from './event.entity';
export declare class EventService {
    private readonly eventRepo;
    private readonly authService;
    private configService;
    constructor(eventRepo: Repository<Event>, authService: AuthService, configService: ConfigService);
    create(ctx: {
        body: CreateEventDto;
        file: Express.Multer.File;
        user: UserPayloadDto;
    }): Promise<Event>;
    getAll(query: Partial<GetEventQueryDto>, favId: number | null): Promise<any>;
    getOne(eventId: number): Promise<Event>;
    getUserEvents({ role, userId }: {
        role: any;
        userId: any;
    }): Promise<Event[]>;
    update(ctx: {
        eventId: number;
        userId: number;
        body: Partial<CreateEventDto>;
    }): Promise<Event>;
    delete(eventId: number, userId: number): Promise<{
        msg: string;
    }>;
}

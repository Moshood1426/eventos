import { Request as RequestType } from 'express';
import { UserPayloadDto } from 'src/auth/dto/user_payload.dto';
import { EventService } from 'src/event/event.service';
import { CheckOutDto } from './dto/checkout_dto';
import { SalesService } from './sales.service';
export declare class SalesController {
    private readonly salesService;
    private readonly eventService;
    constructor(salesService: SalesService, eventService: EventService);
    checkout(user: UserPayloadDto, body: CheckOutDto): Promise<{
        id: number;
        clientSecret: any;
        paymentIntentId: any;
        totalOrderAmount: number;
        numOfTickets: number;
    }>;
    updatePayment(req: RequestType): Promise<{
        msg: string;
    }>;
    getUserTickets(user: UserPayloadDto): Promise<{
        id: number;
        status: string;
        clientSecret: string;
        paymentIntentId: string;
        totalOrderAmount: number;
        numOfTickets: number;
        event: {
            id: number;
            title: string;
            price: number;
        };
    }[]>;
}

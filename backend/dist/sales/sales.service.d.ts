import { Request } from 'express';
import { UserPayloadDto } from 'src/auth/dto/user_payload.dto';
import { Event } from 'src/event/event.entity';
import { Repository } from 'typeorm';
import { CheckOutDto } from './dto/checkout_dto';
import { Sales } from './sales.entity';
export declare class SalesService {
    private salesRepo;
    constructor(salesRepo: Repository<Sales>);
    checkoutUser(user: UserPayloadDto, event: Event, orderDetails: CheckOutDto): Promise<{
        id: number;
        clientSecret: any;
        paymentIntentId: any;
        totalOrderAmount: number;
        numOfTickets: number;
    }>;
    updatePayment(req: Request): Promise<{
        msg: string;
    }>;
    getUserTickets(userId: number): Promise<{
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

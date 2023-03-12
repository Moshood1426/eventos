import { AuthEntity } from 'src/auth/auth.entity';
import { Event } from '../event/event.entity';
export declare class Sales {
    id: number;
    status: string;
    clientSecret: string;
    paymentIntentId: string;
    totalOrderAmount: number;
    numOfTickets: number;
    eventId: number;
    event: Event;
    orderedBy: number;
    user: AuthEntity;
}

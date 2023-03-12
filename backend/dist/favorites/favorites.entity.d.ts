import { AuthEntity } from 'src/auth/auth.entity';
import { Event } from 'src/event/event.entity';
export declare class Favorites {
    id: number;
    userId: number;
    user: AuthEntity;
    eventIds: Event[];
}

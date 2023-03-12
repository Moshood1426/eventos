import { AuthEntity } from 'src/auth/auth.entity';
import { Favorites } from 'src/favorites/favorites.entity';
export declare class Event {
    id: number;
    title: string;
    description: string;
    date: string;
    venue: string;
    location: string;
    price: number;
    host: string;
    imgPath: string;
    category: string;
    capacity: number;
    createdBy: AuthEntity;
    createdById: number;
    isFavsOf: Favorites[];
}

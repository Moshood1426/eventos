import { AuthEntity } from './auth/auth.entity';
import { Event } from './event/event.entity';
import { Favorites } from './favorites/favorites.entity';
import { Sales } from './sales/sales.entity';
export declare const config: () => {
    jwtSecret: string;
    jwtLifetime: string;
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        synchronize: boolean;
        entities: (typeof Favorites | typeof AuthEntity | typeof Event | typeof Sales)[];
    };
};

import { Favorites } from 'src/favorites/favorites.entity';
export declare class AuthEntity {
    id: number;
    name: string;
    role: string;
    email: string;
    password: string;
    userFavs: Favorites;
}

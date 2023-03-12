import { AuthEntity } from './auth/auth.entity';
import { Event } from './event/event.entity';
import { Favorites } from './favorites/favorites.entity';
import { Sales } from './sales/sales.entity';

export const config = () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtLifetime: process.env.JWT_LIFETIME,
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'sviyonox',
    synchronize: true,
    entities: [AuthEntity, Event, Sales, Favorites],
  },
});

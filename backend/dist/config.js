"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const auth_entity_1 = require("./auth/auth.entity");
const event_entity_1 = require("./event/event.entity");
const favorites_entity_1 = require("./favorites/favorites.entity");
const sales_entity_1 = require("./sales/sales.entity");
const config = () => ({
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
        entities: [auth_entity_1.AuthEntity, event_entity_1.Event, sales_entity_1.Sales, favorites_entity_1.Favorites],
    },
});
exports.config = config;
//# sourceMappingURL=config.js.map
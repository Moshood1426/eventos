"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_controller_1 = require("./event.controller");
const event_entity_1 = require("./event.entity");
const event_service_1 = require("./event.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const auth_module_1 = require("../auth/auth.module");
const favorites_module_1 = require("../favorites/favorites.module");
const path_1 = require("path");
const imgPath = (0, path_1.join)(__dirname, '../../uploads');
const fileStorage = (0, multer_1.diskStorage)({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    },
});
let EventModule = class EventModule {
};
EventModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([event_entity_1.Event]),
            platform_express_1.MulterModule.register({
                storage: fileStorage,
            }),
            auth_module_1.AuthModule,
            favorites_module_1.FavoritesModule,
        ],
        controllers: [event_controller_1.EventController],
        providers: [event_service_1.EventService],
        exports: [event_service_1.EventService],
    })
], EventModule);
exports.EventModule = EventModule;
//# sourceMappingURL=event.module.js.map
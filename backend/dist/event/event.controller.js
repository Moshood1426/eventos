"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const authenticate_user_1 = require("../auth/jwt/authenticate_user");
const current_user_decorator_1 = require("../decorator/current-user.decorator");
const create_event_dto_1 = require("./dto/create_event.dto");
const event_service_1 = require("./event.service");
const user_payload_dto_1 = require("../auth/dto/user_payload.dto");
const auth_service_1 = require("../auth/auth.service");
const fav_event_dto_1 = require("./dto/fav-event.dto");
const favorites_service_1 = require("../favorites/favorites.service");
let EventController = class EventController {
    constructor(eventService, authService, favService) {
        this.eventService = eventService;
        this.authService = authService;
        this.favService = favService;
    }
    createEvent(user, body, file) {
        if (!file.mimetype.startsWith('image')) {
            throw new common_1.BadRequestException('File needs to be an image');
        }
        const maxSize = 1024 * 1024 * 4;
        if (file.size > maxSize) {
            throw new common_1.BadRequestException('File should be less than 4MB');
        }
        return this.eventService.create({ file, user, body });
    }
    async getAllEvents(query) {
        if (query.userId) {
            const favId = await this.favService.getUserFavId(+query.userId);
            return this.eventService.getAll(query, favId);
        }
        return this.eventService.getAll(query, null);
    }
    getUserEvents(user) {
        return this.eventService.getUserEvents(user);
    }
    async addEventToFav(body, user) {
        const event = await this.eventService.getOne(body.eventId);
        return this.favService.addEventToFav(event, user.userId);
    }
    async removeEventFromFav(body, user) {
        const event = await this.eventService.getOne(body.eventId);
        return this.favService.removeEventFromFav(body.eventId, user.userId);
    }
    async getUserFavEvents(user) {
        return this.favService.getUserFavEvents(user.userId);
    }
    getSingleEvent(eventId) {
        if (typeof +eventId !== 'number') {
            throw new common_1.NotFoundException('Event with id not found');
        }
        return this.eventService.getOne(+eventId);
    }
    updateEvent(eventId, user, body) {
        const { userId } = user;
        const ctx = { eventId: +eventId, userId, body };
        return this.eventService.update(ctx);
    }
    deleteEvent(eventId, user) {
        const { userId } = user;
        return this.eventService.delete(+eventId, userId);
    }
};
__decorate([
    (0, authenticate_user_1.AuthenticateUser)(),
    (0, common_1.Post)(''),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_payload_dto_1.UserPayloadDto,
        create_event_dto_1.CreateEventDto, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getAllEvents", null);
__decorate([
    (0, authenticate_user_1.AuthenticateUser)(),
    (0, common_1.Get)('/user'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_payload_dto_1.UserPayloadDto]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getUserEvents", null);
__decorate([
    (0, authenticate_user_1.AuthenticateUser)(),
    (0, common_1.Patch)('/add-to-fav'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fav_event_dto_1.FavDto,
        user_payload_dto_1.UserPayloadDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "addEventToFav", null);
__decorate([
    (0, authenticate_user_1.AuthenticateUser)(),
    (0, common_1.Patch)('/remove-from-fav'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fav_event_dto_1.FavDto,
        user_payload_dto_1.UserPayloadDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "removeEventFromFav", null);
__decorate([
    (0, authenticate_user_1.AuthenticateUser)(),
    (0, common_1.Get)('/get-fav-events'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_payload_dto_1.UserPayloadDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getUserFavEvents", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getSingleEvent", null);
__decorate([
    (0, authenticate_user_1.AuthenticateUser)(),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_payload_dto_1.UserPayloadDto, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "updateEvent", null);
__decorate([
    (0, authenticate_user_1.AuthenticateUser)(),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_payload_dto_1.UserPayloadDto]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "deleteEvent", null);
EventController = __decorate([
    (0, common_1.Controller)('api/v1/event'),
    __metadata("design:paramtypes", [event_service_1.EventService,
        auth_service_1.AuthService,
        favorites_service_1.FavoritesService])
], EventController);
exports.EventController = EventController;
//# sourceMappingURL=event.controller.js.map
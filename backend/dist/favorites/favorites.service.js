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
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const favorites_entity_1 = require("./favorites.entity");
let FavoritesService = class FavoritesService {
    constructor(favRepo) {
        this.favRepo = favRepo;
    }
    async getUserFavEvents(userId) {
        const userEvents = await this.favRepo.findOne({
            where: { userId: userId },
            relations: {
                eventIds: true,
            },
        });
        if (!userEvents || !userEvents.eventIds) {
            throw new common_1.NotFoundException('User has no favorites events');
        }
        return userEvents.eventIds;
    }
    async addEventToFav(event, userId) {
        let userEvents;
        userEvents = await this.favRepo.findOne({
            where: { userId: userId },
            relations: {
                eventIds: true,
            },
        });
        if (!userEvents) {
            userEvents = this.favRepo.create({ userId: userId });
            this.favRepo.save(userEvents);
        }
        if (userEvents.eventIds) {
            const eventIsFav = userEvents.eventIds.find((item) => item.id === event.id);
            if (eventIsFav) {
                throw new common_1.BadRequestException('event has been added as favorite');
            }
            userEvents.eventIds = [...userEvents.eventIds, event];
        }
        else {
            userEvents.eventIds = [event];
        }
        await this.favRepo.save(userEvents);
        return userEvents.eventIds;
    }
    async removeEventFromFav(eventId, userId) {
        const user = await this.favRepo.findOne({
            where: { userId: userId },
            relations: {
                eventIds: true,
            },
        });
        if (user.eventIds) {
            const eventIsFav = user.eventIds.find((item) => item.id === eventId);
            if (!eventIsFav) {
                throw new common_1.BadRequestException('event was never a favorite');
            }
            user.eventIds = user.eventIds.filter((item) => item.id !== eventId);
            await this.favRepo.save(user);
            return user.eventIds;
        }
        else {
            throw new common_1.BadRequestException('event was never a favorite');
        }
    }
    async getUserFavId(userId) {
        const userFav = await this.favRepo.findOne({
            where: { userId: userId },
        });
        if (!userFav) {
            const userFavorite = this.favRepo.create({ userId: userId });
            return (await this.favRepo.save(userFavorite)).id;
        }
        return userFav.id;
    }
};
FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(favorites_entity_1.Favorites)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FavoritesService);
exports.FavoritesService = FavoritesService;
//# sourceMappingURL=favorites.service.js.map
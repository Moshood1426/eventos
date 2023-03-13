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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("../auth/auth.service");
const checkPermissions_1 = require("../utils/checkPermissions");
const typeorm_2 = require("typeorm");
const event_entity_1 = require("./event.entity");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
let EventService = class EventService {
    constructor(eventRepo, authService, configService) {
        this.eventRepo = eventRepo;
        this.authService = authService;
        this.configService = configService;
    }
    async create(ctx) {
        const { file, user, body } = ctx;
        if (user.role !== 'creator') {
            throw new common_1.UnauthorizedException('user cannot create event');
        }
        const userInstance = await this.authService.getUser(user.userId);
        cloudinary.config({
            cloud_name: this.configService.get('CLOUD_NAME'),
            api_key: this.configService.get('CLOUD_API_KEY'),
            api_secret: this.configService.get('CLOUD_API_SECRET'),
        });
        const imgURL = await cloudinary.uploader.upload(file.path, {
            use_filename: true,
            folder: 'eventos-app',
        });
        const event = this.eventRepo.create(Object.assign(Object.assign({}, body), { imgPath: imgURL.secure_url, createdBy: userInstance, createdById: user.userId }));
        fs.unlink(file.path, (err) => {
            if (err) {
                throw new common_1.BadRequestException('Something went wrong');
            }
        });
        return this.eventRepo.save(event);
    }
    async getAll(query, favId) {
        const { price, category, date, title, userId } = query;
        let queryObj = {};
        if (price) {
            queryObj.price = (0, typeorm_2.LessThanOrEqual)(price);
        }
        if (title) {
            queryObj.title = (0, typeorm_2.Like)(`%${title}%`);
        }
        if (category) {
            const newCategory = category.replace('_', '&');
            console.log(newCategory);
            queryObj[`category`] = newCategory;
        }
        if (date) {
            queryObj.date = date;
        }
        let result;
        if (favId) {
            const events = await this.eventRepo.find({
                where: Object.assign({}, queryObj),
                loadRelationIds: true,
            });
            result = events.map((item) => {
                if (item.isFavsOf.includes(+favId)) {
                    item.isFavorite = true;
                }
                else {
                    item.isFavorite = false;
                }
                delete item.isFavsOf;
                return item;
            });
        }
        else {
            result = this.eventRepo.find({ where: Object.assign({}, queryObj) });
        }
        return result;
    }
    async getOne(eventId) {
        const event = await this.eventRepo.findOne({
            where: { id: eventId },
        });
        if (!event) {
            throw new common_1.NotFoundException('event with id ' + eventId + ' not found');
        }
        return event;
    }
    async getUserEvents({ role, userId }) {
        if (role !== 'creator') {
            throw new common_1.UnauthorizedException('user not allowed to access this route');
        }
        const events = await this.eventRepo.find({
            where: { createdById: userId },
            loadRelationIds: true,
        });
        if (!events) {
            throw new common_1.NotFoundException('User has no active events');
        }
        return events;
    }
    async update(ctx) {
        const { eventId, userId, body } = ctx;
        const event = await this.eventRepo.findOne({
            where: { id: eventId },
        });
        if (!event) {
            throw new common_1.NotFoundException('event with id ' + eventId + ' not found');
        }
        (0, checkPermissions_1.checkPermissions)(event.createdById, userId);
        for (let item in body) {
            if (event[item] !== body[item]) {
                event[item] = body[item];
            }
        }
        return this.eventRepo.save(event);
    }
    async delete(eventId, userId) {
        const event = await this.eventRepo.findOne({
            where: { id: eventId },
            loadRelationIds: true,
        });
        if (!event) {
            throw new common_1.NotFoundException('event with id ' + eventId + ' not found');
        }
        (0, checkPermissions_1.checkPermissions)(event.createdById, userId);
        await this.eventRepo.remove(event);
        return { msg: 'Event deleted succesfully' };
    }
};
EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService,
        config_1.ConfigService])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map
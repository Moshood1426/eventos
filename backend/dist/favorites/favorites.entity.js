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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favorites = void 0;
const auth_entity_1 = require("../auth/auth.entity");
const event_entity_1 = require("../event/event.entity");
const typeorm_1 = require("typeorm");
let Favorites = class Favorites {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Favorites.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Favorites.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => auth_entity_1.AuthEntity, (user) => user.userFavs),
    __metadata("design:type", auth_entity_1.AuthEntity)
], Favorites.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => event_entity_1.Event, (events) => events.isFavsOf),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Favorites.prototype, "eventIds", void 0);
Favorites = __decorate([
    (0, typeorm_1.Entity)()
], Favorites);
exports.Favorites = Favorites;
//# sourceMappingURL=favorites.entity.js.map
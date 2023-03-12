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
exports.AuthEntity = void 0;
const favorites_entity_1 = require("../favorites/favorites.entity");
const typeorm_1 = require("typeorm");
let AuthEntity = class AuthEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AuthEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AuthEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['creator', 'consumer'],
        default: 'consumer',
    }),
    __metadata("design:type", String)
], AuthEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AuthEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AuthEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => favorites_entity_1.Favorites, (favs) => favs.user),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", favorites_entity_1.Favorites)
], AuthEntity.prototype, "userFavs", void 0);
AuthEntity = __decorate([
    (0, typeorm_1.Entity)()
], AuthEntity);
exports.AuthEntity = AuthEntity;
//# sourceMappingURL=auth.entity.js.map
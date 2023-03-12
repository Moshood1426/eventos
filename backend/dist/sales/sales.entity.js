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
exports.Sales = void 0;
const auth_entity_1 = require("../auth/auth.entity");
const event_entity_1 = require("../event/event.entity");
const typeorm_1 = require("typeorm");
let Sales = class Sales {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sales.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
        default: 'pending',
    }),
    __metadata("design:type", String)
], Sales.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sales.prototype, "clientSecret", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sales.prototype, "paymentIntentId", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], Sales.prototype, "totalOrderAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sales.prototype, "numOfTickets", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sales.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.Event, { onDelete: "CASCADE" }),
    __metadata("design:type", event_entity_1.Event)
], Sales.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sales.prototype, "orderedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => auth_entity_1.AuthEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", auth_entity_1.AuthEntity)
], Sales.prototype, "user", void 0);
Sales = __decorate([
    (0, typeorm_1.Entity)()
], Sales);
exports.Sales = Sales;
//# sourceMappingURL=sales.entity.js.map
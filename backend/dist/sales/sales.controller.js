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
exports.SalesController = void 0;
const common_1 = require("@nestjs/common");
const user_payload_dto_1 = require("../auth/dto/user_payload.dto");
const authenticate_user_1 = require("../auth/jwt/authenticate_user");
const current_user_decorator_1 = require("../decorator/current-user.decorator");
const event_service_1 = require("../event/event.service");
const checkout_dto_1 = require("./dto/checkout_dto");
const sales_service_1 = require("./sales.service");
let SalesController = class SalesController {
    constructor(salesService, eventService) {
        this.salesService = salesService;
        this.eventService = eventService;
    }
    async checkout(user, body) {
        const event = await this.eventService.getOne(body.eventId);
        return this.salesService.checkoutUser(user, event, body);
    }
    async updatePayment(req) {
        return this.salesService.updatePayment(req);
    }
    getUserTickets(user) {
        const userId = user.userId;
        return this.salesService.getUserTickets(userId);
    }
};
__decorate([
    (0, authenticate_user_1.AuthenticateUser)(),
    (0, common_1.Post)('/checkout'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_payload_dto_1.UserPayloadDto,
        checkout_dto_1.CheckOutDto]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "checkout", null);
__decorate([
    (0, common_1.Post)('/webhook'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "updatePayment", null);
__decorate([
    (0, authenticate_user_1.AuthenticateUser)(),
    (0, common_1.Get)('/tickets'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_payload_dto_1.UserPayloadDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "getUserTickets", null);
SalesController = __decorate([
    (0, common_1.Controller)('api/v1/sales'),
    __metadata("design:paramtypes", [sales_service_1.SalesService,
        event_service_1.EventService])
], SalesController);
exports.SalesController = SalesController;
//# sourceMappingURL=sales.controller.js.map
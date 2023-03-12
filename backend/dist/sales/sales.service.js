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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sales_entity_1 = require("./sales.entity");
const stripe = require('stripe')('sk_test_51KquqlF4FMElgbnOo9Kr3nLxmhAIVMRbxQ48RlBVKAHYjI6akNQKheckvaIoO6DR5Ej5N77Jj49WqfB96qhSqzXf00znEiMVEl');
let SalesService = class SalesService {
    constructor(salesRepo) {
        this.salesRepo = salesRepo;
    }
    async checkoutUser(user, event, orderDetails) {
        const { quantity } = orderDetails;
        if (event.capacity < quantity) {
            throw new common_1.BadRequestException('Quantity requested exceed availability');
        }
        let totalAmount = quantity * event.price;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: (totalAmount * 100).toFixed(0),
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });
        const order = {
            numOfTickets: quantity,
            totalOrderAmount: +totalAmount,
            eventId: event.id,
            orderedBy: user.userId,
            status: 'pending',
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        };
        const result = await this.salesRepo.save(order);
        const { id, clientSecret, paymentIntentId, totalOrderAmount, numOfTickets, } = result;
        return {
            id,
            clientSecret,
            paymentIntentId,
            totalOrderAmount,
            numOfTickets,
        };
    }
    async updatePayment(req) {
        const event = req.body;
        const paymentIntentId = event.data.object.payment_intent;
        const order = await this.salesRepo.findOne({ where: { paymentIntentId } });
        if (event.type === 'charge.succeeded') {
            order.status = 'paid';
            await this.salesRepo.save(order);
            console.log('order status updated to paid');
        }
        if (event.type === 'charge.failed') {
            order.status = 'failed';
            await this.salesRepo.save(order);
            console.log('order status updated to paid');
        }
        return { msg: 'Order updated succesfully' };
    }
    async getUserTickets(userId) {
        const tickets = await this.salesRepo.find({
            where: { orderedBy: userId },
            relations: {
                event: true,
            },
        });
        const result = tickets.map((item) => {
            return {
                id: item.id,
                status: item.status,
                clientSecret: item.clientSecret,
                paymentIntentId: item.paymentIntentId,
                totalOrderAmount: item.totalOrderAmount,
                numOfTickets: item.numOfTickets,
                event: {
                    id: item.event.id,
                    title: item.event.title,
                    price: item.event.price,
                },
            };
        });
        return result;
    }
};
SalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sales_entity_1.Sales)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SalesService);
exports.SalesService = SalesService;
//# sourceMappingURL=sales.service.js.map
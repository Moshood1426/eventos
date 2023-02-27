import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { UserPayloadDto } from 'src/auth/dto/user_payload.dto';
import { Event } from 'src/event/event.entity';
import { Repository } from 'typeorm';
import { CheckOutDto } from './dto/checkout_dto';
import { Sales } from './sales.entity';
const stripe = require('stripe')(
  'sk_test_51KquqlF4FMElgbnOo9Kr3nLxmhAIVMRbxQ48RlBVKAHYjI6akNQKheckvaIoO6DR5Ej5N77Jj49WqfB96qhSqzXf00znEiMVEl',
);

@Injectable()
export class SalesService {
  constructor(@InjectRepository(Sales) private salesRepo: Repository<Sales>) {}

  async checkoutUser(
    user: UserPayloadDto,
    event: Event,
    orderDetails: CheckOutDto,
  ) {
    const { quantity } = orderDetails;
    //check ticket quantity and validate availability
    if (event.capacity < quantity) {
      throw new BadRequestException('Quantity requested exceed availability');
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
    const {
      id,
      clientSecret,
      paymentIntentId,
      totalOrderAmount,
      numOfTickets,
    } = result;
    return {
      id,
      clientSecret,
      paymentIntentId,
      totalOrderAmount,
      numOfTickets,
    };
  }

  async updatePayment(req: Request) {
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

  async getUserTickets(userId: number) {
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
}

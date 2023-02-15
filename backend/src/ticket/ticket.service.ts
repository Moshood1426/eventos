import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import path from 'path';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create_ticket.dto';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket) private readonly ticketRepo: Repository<Ticket>,
  ) {}

  async create(ctx: {
    body: CreateTicketDto;
    file: Express.Multer.File;
    user: { userId: number };
  }) {
    //solve issue of saving image on failed request
    const { file, user, body } = ctx;

    const ticket = this.ticketRepo.create({
      ...body,
      imgPath: file.path,
      createdBy: user.userId,
    });

    return this.ticketRepo.save(ticket);
  }

  async getAll() {}

  getSingleEvent() {}

  getUserEvents() {}

  editEvent() {}

  deleteEvent() {}
}

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
    // body: CreateTicketDto;
    file: Express.Multer.File;
    user: { userId: number };
  }) {
    const {  file, user } = ctx;

    // const imagePath = path.join(
    //   __dirname,
    //   '../public/uploads/' + `${file.filename}`,
    // );

    return {path: file.path}
    //add img to images and get link
  }
}

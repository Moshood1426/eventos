import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from './ticket.controller';
import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';
import { MulterModule } from "@nestjs/platform-express"

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketModule {}

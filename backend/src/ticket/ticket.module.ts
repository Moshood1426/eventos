import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from './ticket.controller';
import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

const imgPath = join(__dirname, '../../public/uploads');

const fileStorage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, imgPath);
  },
  filename: (req, file, cb) => {
    cb(null, Math.floor(Math.random() * 109288) + file.originalname);
  },
});

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    MulterModule.register({
      storage: fileStorage,
    }),
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}

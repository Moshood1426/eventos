import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event.controller';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

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
    TypeOrmModule.forFeature([Event]),
    MulterModule.register({
      storage: fileStorage,
    }),
    AuthModule
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}

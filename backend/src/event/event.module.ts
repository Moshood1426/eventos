import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event.controller';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthModule } from 'src/auth/auth.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { join } from 'path';

const imgPath = join(__dirname, '../../uploads');

const fileStorage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
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
    AuthModule,
    FavoritesModule,
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth/auth.entity';
import { EventModule } from './event/event.module';
import { Event } from './event/event.entity';
import { SalesModule } from './sales/sales.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Sales } from './sales/sales.entity';
import { FavoritesModule } from './favorites/favorites.module';
import { Favorites } from './favorites/favorites.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.prod',
    }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Badmantons10',
      database: 'eventos',
      synchronize: true,
      entities: [AuthEntity, Event, Sales, Favorites],
    }),
    EventModule,
    SalesModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

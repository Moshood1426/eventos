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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { config } from './config';
import { DatabaseConfig } from './database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    EventModule,
    SalesModule,
    FavoritesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'build'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,"..", 'uploads'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

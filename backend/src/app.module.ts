import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth/auth.entity';
import { TicketModule } from './ticket/ticket.module';
import { Ticket } from './ticket/ticket.entity';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Badmantons10',
      database: 'eventos',
      synchronize: true,
      entities: [AuthEntity, Ticket],
    }),
    TicketModule,
    SalesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

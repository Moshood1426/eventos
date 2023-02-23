import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from 'src/event/event.module';
import { SalesController } from './sales.controller';
import { Sales } from './sales.entity';
import { SalesService } from './sales.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sales]), EventModule],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}

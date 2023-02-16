import { AuthEntity } from 'src/auth/auth.entity';
import { Event } from '../event/event.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sales {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
    default: 'pending',
  })
  status: string;

  @Column()
  clientSecret: string;

  @Column()
  paymentIntentId: string;

  @Column()
  totalOrderAmount: number;

  @Column()
  numOfTickets: number;

  @ManyToOne(() => Event)
  ticketId: number;

  @ManyToOne(() => AuthEntity)
  @JoinColumn()
  orderedBy: number;
}

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

  @Column('decimal', { precision: 5, scale: 2 })
  totalOrderAmount: number;

  @Column()
  numOfTickets: number;

  @Column()
  eventId: number;

  @ManyToOne(() => Event, {onDelete: "CASCADE"})
  event: Event;

  @Column()
  orderedBy: number;

  @ManyToOne(() => AuthEntity)
  @JoinColumn()
  user: AuthEntity;
}

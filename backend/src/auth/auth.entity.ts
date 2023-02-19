import { Length } from 'class-validator';
import { Event } from 'src/event/event.entity';
import {
  Column,
  Entity,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['creator', 'consumer'],
    default: 'consumer',
  })
  role: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Event)
  @JoinTable()
  favEvents: Event[];
}

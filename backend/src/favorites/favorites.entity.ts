import { AuthEntity } from 'src/auth/auth.entity';
import { Event } from 'src/event/event.entity';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
} from 'typeorm';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @OneToOne(() => AuthEntity, (user) => user.userFavs)
  user: AuthEntity;

  @ManyToMany(() => Event, (events) => events.isFavsOf)
  @JoinTable()
  eventIds: Event[];
}

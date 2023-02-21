import { Length } from 'class-validator';
import { Event } from 'src/event/event.entity';
import { Favorites } from 'src/favorites/favorites.entity';
import {
  Column,
  Entity,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToOne,
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

  @OneToOne(() => Favorites, (favs) => favs.user)
  @JoinTable()
  userFavs: Favorites;
}

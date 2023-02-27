import { AuthEntity } from 'src/auth/auth.entity';
import { Favorites } from 'src/favorites/favorites.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column()
  venue: string;

  @Column()
  location: string;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Column()
  host: string;

  @Column()
  imgPath: string;

  @Column({
    type: 'enum',
    enum: [
      'Business',
      'Food & Drink',
      'Health',
      'Music',
      'Community',
      'Family & Education',
      'Fashion',
      'Film & Media',
      'Hobbies',
      'Home & Lifestyle',
      'Arts',
      'Science & Tech',
      'Sports & Fitness',
      'Travel & Outdoor',
      'Other',
    ],
    default: 'Other',
  })
  category: string;

  @Column()
  capacity: number;

  @ManyToOne(() => AuthEntity)
  @JoinColumn()
  createdBy: AuthEntity;

  @Column()
  createdById: number;

  @ManyToMany(() => Favorites, (favs) => favs.eventIds)
  isFavsOf: Favorites[];
}

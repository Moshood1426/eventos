import { AuthEntity } from 'src/auth/auth.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// {
//     id: 2,
//     title: "The Sweet Spot Borlesque",
//     date: "Fri, Feb 3. 7:00pm",
//     venue: "Old Trafford Stadium",
//     location: "England, LA",
//     price: {
//       category1: 36,
//     },
//     moderator: "The Manchester United Grp",
//     description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
//       sed do eiusmod tempor incididunt ut labore et dolore magna
//        aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing
//        elit, sed do eiusmod tempor incididunt ut labore et dolore
//        magna aliqua.`,
//   };

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: number;

  @Column()
  venue: string;

  @Column()
  location: string;

  @Column("decimal", { precision: 5, scale: 2 })
  price: number;

  @Column()
  host: string;

  @Column()
  imgPath: string

  @ManyToOne(() => AuthEntity)
  createdBy: number
}

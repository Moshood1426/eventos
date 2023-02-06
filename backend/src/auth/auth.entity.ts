import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

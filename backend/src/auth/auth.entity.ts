import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column()
  role: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

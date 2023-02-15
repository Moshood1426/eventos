import { IsNumber, IsString, Length } from 'class-validator';

// @Column()
// title: string;

// @Column()
// description: string;

// @Column()
// date: number;

// @Column()
// venue: string;

// @Column()
// location: string;

// @Column()
// price: number;

// @Column()
// host: string;

// @Column()
// img: string

export class CreateTicketDto {
  @IsString()
  @Length(3, 50)
  //min: 3, max: 50
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  date: number;

  @IsString()
  @Length(3, 50)
  venue: string;

  @IsString()
  @Length(3, 50)
  location: string;

  @IsNumber()
  price: number;

  @IsString()
  @Length(3, 50)
  host: string;

  @IsString()
  img: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  phonenumber: string;

  @Column()
  gender: string;

  @Column()
  type: string;

  @Column()
  number_of_wins: number; // this feild should every time / 3 when you want to know really number of wins players because...

  @Column()
  score: number;

  @Column()
  level: number;

  @Column('simple-array')
  correct_answers_for_categories: number[];

  @Column()
  online: boolean;
}

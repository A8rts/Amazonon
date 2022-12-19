import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Answers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  game_key: string;

  @Column()
  username: string;

  @Column()
  answer: string;

  @Column()
  game_time_id: number;
}

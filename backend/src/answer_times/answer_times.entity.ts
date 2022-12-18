import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // this entity is for know all answers time date and make timer of that
export class AnswerTimes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  game_key: string;

  @Column()
  game_time_id: number;

  @Column()
  date: Date;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // this table is for games when they are started
export class GameTimes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  game_key: string;

  @Column()
  creator: string;

  @Column()
  question_id: number;

  @Column()
  status: string;

  @Column()
  updatedCorrectAnswersForCategories: boolean;
}

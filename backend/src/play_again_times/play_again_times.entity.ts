import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlayAgainTimes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  game_key: string;

  @Column()
  game_time_id: number;

  @Column()
  date: Date;
}

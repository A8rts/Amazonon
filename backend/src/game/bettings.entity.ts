import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Bettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  game_key: string;

  @Column()
  game_time_id: number;

  @Column()
  username: string;

  @Column()
  to_player: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Beads {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  bead: number;

  @Column()
  game_key: string;

  @Column()
  game_time_id: number;
}

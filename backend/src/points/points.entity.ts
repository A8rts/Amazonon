import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // to save and update players coins, with game betting events
export class Points {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  game_key: string;

  @Column()
  coins: number;
}

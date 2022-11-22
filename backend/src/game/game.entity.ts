import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  creator: string;

  @Column()
  type: string;

  @Column({ type: 'simple-array' })
  subjects: string[];

  @Column()
  capacity: number;

  @Column()
  status: string; // this is for when capacity of room is full and we do not allow other users join the game
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // to save all winners from games
export class Winners {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  game_key: string;

  @Column({ type: 'simple-array' })
  winners: string[];
}

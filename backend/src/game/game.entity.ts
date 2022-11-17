import { Column, Entity, PrimaryGeneratedColumn, IsNull } from 'typeorm';

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
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Questions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  question: string;

  @Column()
  guide1: string;

  @Column()
  guide2: string;
}

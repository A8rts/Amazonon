import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FriendRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  status: string;

  @Column()
  date: Date;
}

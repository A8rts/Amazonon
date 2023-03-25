import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InviteOnlinePlayers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from_game_key: string;

  @Column()
  to_user: string;

  @Column()
  date: Date;
}

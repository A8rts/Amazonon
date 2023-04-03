import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VerificationCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: number;

  @Column()
  phonenumber: string;

  @Column()
  username: string;

  @Column()
  gender: string;

  @Column()
  date: Date;
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ChatUserStat } from "./ChatUserStat";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  telegramId: number;

  @Column({ nullable: true })
  username: string;

  @OneToMany(() => ChatUserStat, (chatStat) => chatStat.user)
  chatStats: ChatUserStat[];
}

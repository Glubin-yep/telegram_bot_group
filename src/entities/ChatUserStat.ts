import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from "typeorm";
import { User } from "./User";

@Entity()
@Unique(["user", "chatId"])
export class ChatUserStat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.chatStats, { eager: true })
  user: User;

  @Column("bigint")
  chatId: string;

  @Column({ default: 0 })
  messageCount: number;

  @Column({ default: 0 })
  badWordCount: number;
}

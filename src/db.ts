import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import * as dotenv from "dotenv";
import { ChatUserStat } from "./entities/ChatUserStat";

dotenv.config();

console.log(process.env.DB_USER);
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: true,
  synchronize: true,
  logging: false,
  entities: [User, ChatUserStat],
  migrations: [],
  subscribers: [],
});

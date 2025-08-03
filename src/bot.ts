import { Telegraf } from "telegraf";
import * as dotenv from "dotenv";
import BotCommandInitializer from "./commands/commandInitializer ";
import BotHandlersInitializer from "./handlers/handlersInitializer";
dotenv.config();

export const bot = new Telegraf(process.env.BOT_TOKEN as string);

BotCommandInitializer(bot);
BotHandlersInitializer(bot);

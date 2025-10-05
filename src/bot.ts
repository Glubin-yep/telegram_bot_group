import { Telegraf } from "telegraf";
import * as dotenv from "dotenv";
import BotCommandInitializer from "./commands/commandInitializer ";
import BotHandlersInitializer from "./handlers/handlersInitializer";
import { measureExecutionTime } from "./Middleware/measureExecutionTime";
import { scheduleDailyHoroscopes } from "./services/scheduleDailyTaskService";
dotenv.config();

export const bot = new Telegraf(process.env.BOT_TOKEN as string);

bot.use(measureExecutionTime);

BotCommandInitializer(bot);
BotHandlersInitializer(bot);
scheduleDailyHoroscopes(bot);


import { Telegraf } from "telegraf";
import * as dotenv from "dotenv";
import { registerCommands } from "./commands/register";
import { registerTextHandler } from "./handlers/textHandler";
import { registerHears } from "./handlers/hearsHandler";
import { registerGeneralCommands } from "./commands/generalCommands";

dotenv.config();
export const bot = new Telegraf(process.env.BOT_TOKEN as string);

// Реєстрація усіх команд, hears тощо
registerCommands(bot);
registerHears(bot);
registerTextHandler(bot);
registerGeneralCommands(bot);

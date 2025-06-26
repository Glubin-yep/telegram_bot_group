import { Telegraf } from "telegraf";
import * as dotenv from "dotenv";
import { registerCommands } from "./commands/register";
import { registerTextHandler } from "./handlers/textHandler";
import { registerHears } from "./handlers/hearsHandler";
import { registerGeneralCommands } from "./commands/generalCommands";
import fs from "fs";
import path from "path";
import { registerBadWordsHandler } from "./handlers/badWordsHandler";

dotenv.config();

export const bot = new Telegraf(process.env.BOT_TOKEN as string);
export const BAD_WORDS: Set<string> = new Set(
  fs
    .readFileSync(path.join(__dirname, "constants/badWords.txt"), "utf-8")
    .split(/\r?\n/)
    .map((line) => line.trim().toLowerCase())
    .filter(Boolean), // видаляємо порожні рядки
);

registerCommands(bot);
registerHears(bot);
registerTextHandler(bot);
registerGeneralCommands(bot);
registerBadWordsHandler(bot);

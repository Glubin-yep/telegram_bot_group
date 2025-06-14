import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

import * as dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN as string);
bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

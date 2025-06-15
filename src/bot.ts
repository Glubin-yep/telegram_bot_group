import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import * as dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN as string);

// Памʼяті для статистики
const userStats: Record<number, number> = {}; // userId -> count

bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));

bot.command("ping", (ctx) => ctx.reply("Pong!"));

// При отриманні стікера — просто реакція
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));

// Реакція на повідомлення "hi"
bot.hears("Привіт", (ctx) =>
  ctx.reply("Радий вітати вас, найпрекрасніший фронтендер на світі")
);

// Команда для перевірки статистики
bot.command("stats", (ctx) => {
  const userId = ctx.from?.id;
  const username = ctx.from?.username || ctx.from?.first_name || "Користувач";
  if (userId) {
    const count = userStats[userId] || 0;
    ctx.reply(`${username}, ви надіслали ${count} повідомлень.`);
  } else {
    ctx.reply("Не вдалося визначити ваш ID.");
  }
});

// Врахування лише текстових повідомлень
bot.on("text", (ctx) => {
  const userId = ctx.from?.id;
  if (userId) {
    userStats[userId] = (userStats[userId] || 0) + 1;
  }
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

import { Telegraf } from "telegraf";

export function registerGeneralCommands(bot: Telegraf) {
  bot.command("start", (ctx) => {
    ctx.reply("Welcome! Я Добі — ваш вірний помічник 🧦");
  });

  bot.command("help", (ctx) => {
    ctx.reply(
      "https://github.com/Glubin-yep/telegram_bot_group/blob/main/README.md",
    );
  });

  bot.command("ping", (ctx) => {
    ctx.reply("Я тут! Усе в порядку 👋");
  });

  bot.command("source", (ctx) => {
    ctx.reply("https://github.com/Glubin-yep/telegram_bot_group");
  });
}

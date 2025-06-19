import { Telegraf } from "telegraf";

export function registerGeneralCommands(bot: Telegraf) {
  // /start — вітальне повідомлення
  bot.command("start", (ctx) => {
    ctx.reply("Welcome! Я Добі — ваш вірний помічник 🧦");
  });

  // /help — інформація про можливості бота
  bot.command("help", (ctx) => {
    ctx.reply(
      "https://github.com/Glubin-yep/telegram_bot_group/blob/main/README.md",
    );
  });

  // /alive — перевірка працездатності (замість ping)
  bot.command("alive", (ctx) => {
    ctx.reply("Я тут! Усе в порядку 👋");
  });

  // /source — посилання на репозиторій
  bot.command("source", (ctx) => {
    ctx.reply("https://github.com/Glubin-yep/telegram_bot_group");
  });
}

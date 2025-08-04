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

  bot.command("ping", async (ctx) => {
    const start = Date.now();

    const message = await ctx.reply("Перевірка...");

    const end = Date.now();
    const latency = end - start;

    await ctx.telegram.editMessageText(
      ctx.chat.id,
      message.message_id,
      undefined,
      `Я тут! Усе в порядку 👋\nЧас обробки: ${latency} мс`
    );
  });

  bot.command("source", (ctx) => {
    ctx.reply("https://github.com/Glubin-yep/telegram_bot_group");
  });
}

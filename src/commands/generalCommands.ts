import { Telegraf } from "telegraf";
import { sendMessage } from "../services/messageService";

export function registerGeneralCommands(bot: Telegraf) {
  bot.command("start", (ctx) => {
    const text = "Welcome! Я Добі — ваш вірний помічник 🧦";
    sendMessage(ctx, text);
  });

  bot.command("help", (ctx) => {
    const text = "https://github.com/Glubin-yep/telegram_bot_group/blob/main/README.md";
    sendMessage(ctx, text);
  });

  bot.command("ping", async (ctx) => {
    const text = "Я тут! Усе в порядку 👋";
    sendMessage(ctx, text);
  });

  bot.command("source", (ctx) => {
    const text = "https://github.com/Glubin-yep/telegram_bot_group";
    sendMessage(ctx, text);
  });
}

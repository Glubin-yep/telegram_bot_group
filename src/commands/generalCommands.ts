import { Telegraf } from "telegraf";
import { sendMessage } from "../services/messageService";
import os from "os";


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


  bot.command("status", async (ctx) => {
    const adminId = process.env.ADMIN_ID;

    if (ctx.from?.id.toString() !== adminId) {
      return sendMessage(ctx, "🚫 Ви не мій господар");
    }

    const uptime = process.uptime();
    const uptimeFormatted = new Date(uptime * 1000).toISOString().substr(11, 8);

    const info = [
      `👤 ID: \`${ctx.from.id}\``,
      ctx.from.username ? `🔗 Username: @${ctx.from.username}` : "",
      `💬 Chat ID: \`${ctx.chat?.id}\``,
      `🖥️ Host: ${os.hostname()}`,
      `Node.js: \`${process.version}\``,
      `⏳ Uptime: ${uptimeFormatted}`,
      `📦 Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
    ]
      .filter(Boolean)
      .join("\n");

    await sendMessage(ctx, `🐞 Status інформація:\n\n${info}`);
  });
}

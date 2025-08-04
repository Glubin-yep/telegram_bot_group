import { Telegraf } from "telegraf";
import { status } from "minecraft-server-util";

export function registerMcStatusCommand(bot: Telegraf) {
  bot.command("mcstatus", async (ctx) => {
    const args = ctx.message.text.split(" ").slice(1);
    const ip = args[0];
    const port = Number(args[1]) || 25565;

    if (!ip) {
      await ctx.reply(
        "❗ Вкажіть IP або домен сервера. Приклад: /mcstatus 5.58.95.197 25625",
      );
      return;
    }

    try {
      const response = await status(ip, port, { timeout: 15000 });

      await ctx.replyWithMarkdownV2(
        `🟢 Сервер працює\\!\n\n` +
        `*IP:* \`${escapeMarkdown(ip)}:${port}\`\n` +
        `*Опис:* ${escapeMarkdown(response.motd.clean)}\n` +
        `*Гравці:* ${response.players.online} / ${response.players.max}\n` +
        `*Версія:* ${escapeMarkdown(response.version.name)}`,
      );
    } catch (error) {
      console.log(error);
      await ctx.reply(
        `🔴 Сервер \`${ip}:${port}\` недоступний або не відповідає.`,
      );
    }
  });
}

// Escape функція для MarkdownV2
function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+-=|{}.!\\]/g, "\\$&");
}

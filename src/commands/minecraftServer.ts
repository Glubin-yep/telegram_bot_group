import { Telegraf } from "telegraf";
import { status } from "minecraft-server-util";
import { sendMessage } from "../services/messageService";

export function registerMcStatusCommand(bot: Telegraf) {
  bot.command("mcstatus", async (ctx) => {
    const args = ctx.message.text.split(" ").slice(1);
    const ip = args[0];
    const port = Number(args[1]) || 25565;

    if (!ip) {
      const text = "❗ Вкажіть IP або домен сервера. Приклад: /mcstatus 5.58.95.197 25625";
      sendMessage(ctx, text);
      return;
    }

    try {
      const response = await status(ip, port, { timeout: 15000 });

      const text =
        `🟢 Сервер працює! \n` +
        `IP: \`${ip}:${port}\n` +
        `Опис: ${response.motd.clean}\n` +
        `Гравці: ${response.players.online} / ${response.players.max}\n` +
        `Версія: ${response.version.name}`;

      sendMessage(ctx, text);

    } catch (error) {
      console.log(error);
      const text = `🔴 Сервер \`${ip}:${port}\` недоступний або не відповідає.`;
      sendMessage(ctx, text);
    }
  });
}


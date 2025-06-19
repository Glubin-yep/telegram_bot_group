import { Telegraf } from "telegraf";
import { _userStats } from "../state/stats";

export default function stats(bot: Telegraf) {
  bot.command("stats", (ctx) => {
    const userId = ctx.from?.id;
    const username = ctx.from?.username || ctx.from?.first_name || "Користувач";
    if (userId) {
      const count = _userStats[userId] || 0;
      ctx.reply(`${username}, ви надіслали ${count} повідомлень.`);
    } else {
      ctx.reply("Не вдалося визначити ваш ID.");
    }
  });
}

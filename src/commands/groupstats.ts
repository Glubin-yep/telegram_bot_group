import { Telegraf } from "telegraf";
import { _groupStats } from "../state/stats";

export default function groupStats(bot: Telegraf) {
  bot.command("groupstats", (ctx) => {
    const chatId = ctx.chat.id;
    const count = _groupStats[chatId] || 0;

    let chatName: string;

    if ("title" in ctx.chat) {
      chatName = ctx.chat.title;
    } else if ("first_name" in ctx.chat) {
      chatName = ctx.chat.first_name;
    } else {
      chatName = "Цей чат";
    }

    ctx.reply(
      `${chatName} має ${ctx.message.message_id} повідомлень, які бот зафіксував.`,
    );
  });
}

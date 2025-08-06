import { Telegraf } from "telegraf";
import { sendMessage } from "../services/messageService";

export default function groupStats(bot: Telegraf) {
  bot.command("groupstats", (ctx) => {
    let chatName: string;

    if ("title" in ctx.chat) {
      chatName = ctx.chat.title;
    } else if ("first_name" in ctx.chat) {
      chatName = ctx.chat.first_name;
    } else {
      chatName = "Цей чат";
    }

    const text = `📈 Добі повідомляє: у ${chatName} вже цілих ${ctx.message.message_id} повідомлень! Якщо так далі піде, я почну просити бонус за таку роботу! 🧦`;

    sendMessage(ctx, text);
  });
}

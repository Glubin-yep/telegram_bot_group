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

    const text = `${chatName} має ${ctx.message.message_id} повідомлень, які бот зафіксував.`;
    sendMessage(ctx, text);
  });
}

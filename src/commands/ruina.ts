import { Telegraf } from "telegraf";
import { _lastUserMessage } from "../state/stats";

export default function ruina(bot: Telegraf) {
  bot.command("ruina", async (ctx) => {
    //console.log(ctx.chat.id);

    const chatId = ctx.chat.id;
    const msgId = _lastUserMessage[chatId];

    if (!msgId) {
      return ctx.reply("Немає повідомлення для видалення");
    }

    try {
      await ctx.telegram.deleteMessage(chatId, msgId);
      await ctx.reply("Так, пане! Добі вже тре підлогу і тре чат 🧽");
    } catch (e) {
      console.error("Помилка при видаленні:", e);
      ctx.reply(
        "Не вдалося видалити повідомлення. Перевірте права або формат.",
      );
    }
  });
}

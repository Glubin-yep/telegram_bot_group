import { Telegraf } from "telegraf";
import { sendMessage } from "../services/messageService";

export default function ruina(bot: Telegraf) {
  bot.command("ruina", async (ctx) => {
    const msgIdToDelete = ctx.message.message_id - 1;

    if (!msgIdToDelete) {
      return sendMessage(ctx, "Немає повідомлення для видалення");
    }

    try {
      await ctx.telegram.deleteMessage(ctx.chat.id, msgIdToDelete);
      return sendMessage(ctx, "Так, пане! Добі вже тре підлогу і тре чат 🧽");
    }
    catch (error) {
      console.log("Помилка при видаленні:", error);
      sendMessage(ctx,
        "Не вдалося видалити повідомлення. Перевірте права або формат.",
      );
    }
  });
}

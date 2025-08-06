import { Telegraf } from "telegraf";
import { User } from "../entities/User";
import { AppDataSource } from "../db";
import { ChatUserStat } from "../entities/ChatUserStat";
import { sendMessage } from "../services/messageService";

export default function stats(bot: Telegraf) {
  bot.command("stats", async (ctx) => {
    const userId = ctx.from?.id;
    const username = ctx.from?.username || ctx.from?.first_name || "Користувач";
    const chatId = ctx.chat.id.toString();

    if (!userId || !chatId) {
      return sendMessage(ctx, "Не вдалося визначити ваш ID або чат.");
    }

    try {
      const userRepository = AppDataSource.getRepository(User);
      const chatUserStatRepository = AppDataSource.getRepository(ChatUserStat);

      const user = await userRepository.findOneBy({ telegramId: userId });
      if (!user) {
        return sendMessage(ctx, `${username}, вас немає в базі даних.`);
      }

      const chatUserStat = await chatUserStatRepository.findOne({
        where: { user: { id: user.id }, chatId },
      });

      if (!chatUserStat) {
        return sendMessage(ctx,
          `${username}, ви ще не надсилали повідомлень у цьому чаті.`,
        );
      }

      sendMessage(ctx,
        `${username}, ти відправив ${chatUserStat.messageCount} меседжів.\n З них ${chatUserStat.badWordCount} — з лайкою. Добі це фіксує. Добі розчарований. 😔🧦`,
      );
    } catch (error) {
      console.error("Помилка при отриманні статистики:", error);
      sendMessage(ctx, "Виникла помилка при отриманні статистики.");
    }
  });
}

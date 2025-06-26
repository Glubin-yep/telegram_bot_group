import { Telegraf } from "telegraf";
import { User } from "../entities/User";
import { AppDataSource } from "../db";
import { ChatUserStat } from "../entities/ChatUserStat";

export default function stats(bot: Telegraf) {
  bot.command("stats", async (ctx) => {
    const userId = ctx.from?.id;
    const username = ctx.from?.username || ctx.from?.first_name || "Користувач";
    const chatId = ctx.chat.id.toString();

    if (!userId || !chatId) {
      return ctx.reply("Не вдалося визначити ваш ID або чат.");
    }

    try {
      const userRepository = AppDataSource.getRepository(User);
      const chatUserStatRepository = AppDataSource.getRepository(ChatUserStat);

      const user = await userRepository.findOneBy({ telegramId: userId });
      if (!user) {
        return ctx.reply(`${username}, вас немає в базі даних.`);
      }

      const chatUserStat = await chatUserStatRepository.findOne({
        where: { user: { id: user.id }, chatId },
      });

      if (!chatUserStat) {
        return ctx.reply(
          `${username}, ви ще не надсилали повідомлень у цьому чаті.`,
        );
      }

      ctx.reply(
        `${username}, ви надіслали ${chatUserStat.messageCount} повідомлень у цьому чаті. З них не цензурних ${chatUserStat.badWordCount}!`,
      );
    } catch (error) {
      console.error("Помилка при отриманні статистики:", error);
      ctx.reply("Виникла помилка при отриманні статистики.");
    }
  });
}

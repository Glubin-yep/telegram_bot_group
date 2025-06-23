import { Telegraf } from "telegraf";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { ChatUserStat } from "../entities/ChatUserStat";

export function registerTextHandler(bot: Telegraf) {
  bot.on("text", async (ctx, next) => {
    const telegramId = ctx.from?.id;
    const username = ctx.from?.username || ctx.from?.first_name;
    const chatId = ctx.chat.id.toString();

    if (!telegramId || !chatId) {
      return next();
    }

    const userRepository = AppDataSource.getRepository(User);
    const chatUserStatRepository = AppDataSource.getRepository(ChatUserStat);

    // Знаходимо користувача за telegramId
    let user = await userRepository.findOneBy({ telegramId });
    if (!user) {
      user = userRepository.create({
        telegramId,
        username,
      });
      await userRepository.save(user);
    }

    // Знаходимо статистику чату для конкретного user.id
    let chatUserStat = await chatUserStatRepository.findOne({
      where: { user: { id: user.id }, chatId },
    });

    if (!chatUserStat) {
      chatUserStat = chatUserStatRepository.create({
        user,
        chatId,
        messageCount: 1,
      });
      await chatUserStatRepository.save(chatUserStat);
    } else {
      chatUserStat.messageCount += 1;
      await chatUserStatRepository.save(chatUserStat);
    }

    await next();
  });
}

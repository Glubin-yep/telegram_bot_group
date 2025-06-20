import { Telegraf } from "telegraf";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { ChatUserStat } from "../entities/ChatUserStat";

export function registerTextHandler(bot: Telegraf) {
  bot.on("text", async (ctx, next) => {
    const userId = ctx.from?.id;
    const username = ctx.from?.username || ctx.from?.first_name;
    const chatId = ctx.chat.id.toString();

    if (!userId || !chatId) {
      return next();
    }

    const userRepository = AppDataSource.getRepository(User);
    const chatUserStatRepository = AppDataSource.getRepository(ChatUserStat);

    let user = await userRepository.findOneBy({ telegramId: userId });
    if (!user) {
      user = userRepository.create({
        telegramId: userId,
        username,
      });
      await userRepository.save(user);
    }

    let chatUserStat = await chatUserStatRepository.findOne({
      where: { user: { id: user.id }, chatId },
    });

    if (!chatUserStat) {
      chatUserStat = chatUserStatRepository.create({
        user,
        chatId,
        messageCount: 1,
      });
    } else {
      chatUserStat.messageCount++;
    }

    await chatUserStatRepository.save(chatUserStat);

    await next();
  });
}

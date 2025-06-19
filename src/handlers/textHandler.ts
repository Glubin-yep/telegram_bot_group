import { Telegraf } from "telegraf";
import {
  _activeChats,
  _lastUserMessage,
  _userStats,
  _groupStats,
} from "../state/stats";

export function registerTextHandler(bot: Telegraf) {
  bot.on("text", async (ctx, next) => {
    const chatId = ctx.chat.id;
    const msgId = ctx.message.message_id;
    const userId = ctx.from?.id;

    _activeChats.add(chatId);
    _lastUserMessage[chatId] = msgId;

    if (userId) {
      _userStats[userId] = (_userStats[userId] || 0) + 1;
    }

    _groupStats[chatId] = (_groupStats[chatId] || 0) + 1;

    await next();
  });
}

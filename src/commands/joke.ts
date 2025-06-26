import { Telegraf } from "telegraf";
import { getRandomJoke } from "../services/jokeservice";

export async function getJoke(bot: Telegraf, chatId: string) {
  const joke = await getRandomJoke();
  await bot.telegram.sendMessage(chatId, `😂 Жарт години:\n\n${joke}`);
}

export function sendJoke(bot: Telegraf) {
  bot.command("joke", (ctx) => {
    const chatId = ctx.chat?.id?.toString();
    if (chatId) {
      getJoke(bot, chatId);
    }
  });
}

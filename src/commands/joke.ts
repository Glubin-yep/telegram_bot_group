import { Telegraf } from "telegraf";
import { getRandomJoke } from "../services/jokeservice";
import { sendMessage } from "../services/messageService";

export async function sendJoke(bot: Telegraf) {
  const joke = await getRandomJoke();

  bot.command("joke", (ctx) => {
    sendMessage(ctx, joke);
  });
}

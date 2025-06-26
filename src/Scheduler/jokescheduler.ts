import { Telegraf } from "telegraf";
import { getJoke } from "../commands/joke";

export function startJokeScheduler(bot: Telegraf, chatId: string) {
  // Надсилаємо перший жарт відразу
  getJoke(bot, chatId);

  // Кожні 3600000 мс (1 година)
  setInterval(() => {
    getJoke(bot, chatId);
  }, 3600000);
}

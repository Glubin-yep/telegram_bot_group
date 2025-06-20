import { Telegraf } from "telegraf";
import { _steamUsers } from "../state/stats";
import { getPlayerSummary } from "../services/steamhelper";

export default function steam(bot: Telegraf) {
  bot.command("steam", async (ctx) => {
    const args = ctx.message.text.split(" ");
    if (args.length < 2) {
      return ctx.reply("Використання: /steam @telegram_username");
    }

    const username = args[1].replace("@", "").trim();

    const steamId = _steamUsers[username];
    if (!steamId) {
      return ctx.reply("❌ Користувача не знайдено у локальній базі.");
    }

    const status = await getPlayerSummary(steamId);

    if (typeof status === "string") {
      // Якщо повернулося просто повідомлення (помилка або користувач не знайдений)
      return ctx.reply(status);
    }

    // Якщо повернувся об'єкт із photoUrl і caption — надсилаємо фото з підписом
    return ctx.replyWithPhoto(status.photoUrl, {
      caption: status.caption,
      parse_mode: "HTML",
    });
  });
}

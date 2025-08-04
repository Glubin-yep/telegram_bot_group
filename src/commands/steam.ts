import { Telegraf } from "telegraf";
import { getPlayerSummary } from "../services/steamhelper";
import { _steamUsers } from "../constants/SteamID";
import { sendMessage } from "../services/messageService";

export default function steam(bot: Telegraf) {
  bot.command("steam", async (ctx) => {
    const args = ctx.message.text.split(" ");
    if (args.length < 2) {
      return sendMessage(ctx, "Використання: /steam @telegram_username");
    }

    const username = args[1].replace("@", "").trim();

    const steamId = _steamUsers[username];
    if (!steamId) {
      return sendMessage(ctx, "❌ Користувача не знайдено у локальній базі.");
    }

    const status = await getPlayerSummary(steamId);

    if (typeof status === "string") {
      return sendMessage(ctx, status);
    }

    return sendMessage(ctx, status.caption, status.photoUrl);
  });
};


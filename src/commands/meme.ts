import { Telegraf } from "telegraf";
import { sendMessage } from "../services/messageService";
import { getRandomMeme } from "../services/memeService";

export function sendMeme(bot: Telegraf) {
    bot.command("meme", async (ctx) => {
        const meme = await getRandomMeme();

        const text = `📛Subreddit: ${meme.subreddit}`;


        await sendMessage(ctx, text, meme.url); // meme.url — посилання на зображення
    });
}
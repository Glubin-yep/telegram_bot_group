import { Telegraf } from "telegraf";
import { sendMessage } from "../services/messageService";
import { getRandomMeme } from "../services/memeService";

export function sendMeme(bot: Telegraf) {
    bot.command("meme", async (ctx) => {
        const meme = await getRandomMeme();

        const text = `
        🖼 ${meme.title}\n
        📛Subreddit: ${meme.subreddit}\n 
        👤Автор: ${meme.author}\n
        👍 ${meme.ups} upvotes\n 
        🌐Пост на Reddit: "${meme.postLink}"\n
        🔞NSFW: ${meme.nsfw ? "Так" : "Ні"}\n`;

        await sendMessage(ctx, text, meme.url); // meme.url — посилання на зображення
    });
}
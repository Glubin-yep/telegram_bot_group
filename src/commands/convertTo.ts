import { Telegraf } from "telegraf";
import { sendMessage } from "../services/messageService";

export function ConvertToBinery(bot: Telegraf) {
    bot.command("convertToBin", async (ctx) => {
        const args = ctx.message.text.split(" ");
        if (args.length < 2) {
            return ctx.reply("Використання: /convertToBin `повідомлення`");
        }

        const text = args.slice(1).join(" ").trim();

        const bin = text.split('').map((char) => char.charCodeAt(0).toString(2)).join(' ');

        sendMessage(ctx, bin);
    });

    bot.command("convertBinToText", async (ctx) => {
        const args = ctx.message.text.split(" ");
        if (args.length < 2) {
            return ctx.reply("Використання: /convertBinToText `бінарне_повідомлення`");
        }

        const binText = args.slice(1).join(" ").trim();

        try {
            const text = binText
                .split(" ")
                .map(bin => String.fromCharCode(parseInt(bin, 2)))
                .join("");

            return sendMessage(ctx, text);
        } catch (error) {
            console.error("Помилка при перетворенні бінарного коду:", error);
            return ctx.reply("Помилка при перетворенні. Переконайтеся, що введено коректний бінарний код.");
        }
    });
}

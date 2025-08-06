import { Context } from "telegraf";

function escapeMarkdown(text: string): string {
    return text.replace(/([_*[\]()~`>#+=|{}.!\\-])/g, "\\$1");
}

export async function sendMessage(
    ctx: Context,
    textMessage: string,
    photoUrl?: string,
) {
    const start = ctx.state?.startTime ?? Date.now();

    if (!ctx.chat) {
        console.log("Can't find chat id");
        return;
    }

    const processingMessage = await ctx.reply(escapeMarkdown("⏳ Обробка..."), {
        parse_mode: "MarkdownV2"
    });

    const latency = Date.now() - start;

    const formattedText = [
        `*Добі виконав команду господаря*`,
        "",
        escapeMarkdown(textMessage),
        "",
        `⏱️ *Час обробки:* \`${(latency / 1000).toFixed(2)} s\``,
    ].join("\n");

    if (photoUrl) {
        await ctx.telegram.deleteMessage(ctx.chat.id, processingMessage.message_id);
        return ctx.telegram.sendPhoto(ctx.chat.id, photoUrl, {
            caption: formattedText,
            parse_mode: "MarkdownV2"
        });
    }

    return ctx.telegram.editMessageText(
        ctx.chat.id,
        processingMessage.message_id,
        undefined,
        formattedText,
        { parse_mode: "MarkdownV2" }
    );
}


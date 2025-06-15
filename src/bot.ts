import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import * as dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN as string);

// Памʼять для статистики та останнього повідомлення
// TODO замінити на БД
const userStats: Record<number, number> = {}; // userId -> count
const groupStats: Record<number, number> = {}; // chatId -> count
const lastUserMessage: Record<number, number> = {}; // chatId -> messageId

bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) =>
  ctx.reply(
    "https://github.com/Glubin-yep/telegram_bot_group/blob/main/README.md"
  )
);
bot.command("ping", (ctx) => ctx.reply("Pong!"));

bot.on("text", async (ctx, next) => {
  const chatId = ctx.chat.id;
  const msgId = ctx.message.message_id;
  const userId = ctx.from?.id;

  const isCommand = ctx.message.entities?.some(
    (e) => e.type === "bot_command" && e.offset === 0
  );

  console.log("Збережено як останнє повідомлення:", msgId);
  lastUserMessage[chatId] = msgId;

  // Підрахунок статистики тут
  // TODO замінити на БД
  if (userId) {
    userStats[userId] = (userStats[userId] || 0) + 1;
  }

  // Лічильник для чату
  // TODO замінити на БД
  groupStats[chatId] = (groupStats[chatId] || 0) + 1;

  await next();
});

bot.hears("Привіт Добі", (ctx) =>
  ctx.reply("Радий вітати вас, найпрекрасніший фронтендер на світі")
);

bot.hears("🧦", (ctx) => ctx.reply("Ура, тепер Добі вільний"));

bot.command("stats", (ctx) => {
  const userId = ctx.from?.id;
  const username = ctx.from?.username || ctx.from?.first_name || "Користувач";
  if (userId) {
    const count = userStats[userId] || 0;
    ctx.reply(`${username}, ви надіслали ${count} повідомлень.`);
  } else {
    ctx.reply("Не вдалося визначити ваш ID.");
  }
});

bot.command("groupstats", (ctx) => {
  const chatId = ctx.chat.id;
  const count = groupStats[chatId] || 0;

  let chatName: string;

  if ("title" in ctx.chat) {
    chatName = ctx.chat.title;
  } else if ("first_name" in ctx.chat) {
    chatName = ctx.chat.first_name;
  } else {
    chatName = "Цей чат";
  }

  ctx.reply(
    `${chatName} має ${ctx.message.message_id} повідомлень, які бот зафіксував.`
  );
});
bot.command("source", (ctx) => {
  ctx.reply("https://github.com/Glubin-yep/telegram_bot_group");
});

// Команда /ruina — видаляє останнє повідомлення в чаті
bot.command("ruina", async (ctx) => {
  console.log("Команда ruina викликана");

  const chatId = ctx.chat.id;
  const msgId = lastUserMessage[chatId];

  if (!msgId) {
    return ctx.reply("Немає повідомлення для видалення");
  }

  try {
    await ctx.telegram.deleteMessage(chatId, msgId);
    await ctx.reply("Останнє повідомлення видалено.");
  } catch (e) {
    console.error("Помилка при видаленні:", e);
    ctx.reply("Не вдалося видалити повідомлення. Перевірте права або формат.");
  }
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

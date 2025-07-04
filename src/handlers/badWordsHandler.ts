import { BAD_WORDS } from "../bot"; // або шлях, куди експортували
import { Telegraf } from "telegraf";
import { AppDataSource } from "../db";
import { ChatUserStat } from "../entities/ChatUserStat";
import { User } from "../entities/User";

const naughtyReplies = [
  "🌚 Добі почув — Добі запам’ятав. Чекай листа від сови.",
  "☠️ Так не лаються навіть тролі… Чесне тролівське.",
  "🤯 Яке соковите словечко! Записую в Книгу Тролів.",
  "🚨 Лексичний патруль спіймав порушення. Добі вже в дорозі з ременем!",
  "💡 Навіть маглівський бот знає, що так казати не варто.",
  "🕵️‍♀️ Так, Добі все чує... Інформую магічну Інквізицію.",
  "🎱 Ну й словечко! Твоє місце вже заброньоване в Залі Тролів.",
  "👁️ Великий брат почув. Слово занесено в Чорну Книгу.",
  "🗡️ Збережено в базу. Кузня Саурона відпочиває.",
  "👺 Твої мати гідні сувоїв демона Баала.",
  "🕹️ Кодова фраза прийнята — сервер в шоці.",
  "☢️ Так не гудить навіть реактор ЧАЕС.",
  "👁️ Твою лайку побачив Саурон. Він схвалює.",
  "☠️ Словесний яд отримано — готуємо антидот.",
  "🧙‍♂️ Магічний вогонь твоєї лайки підпалив не тільки чат, але й душу.",
  "🗡️ Твої слова гостріші за клинок Баала.",
  "🎲 Лише кубик долі вирішує, чи вдасться так говорити тут.",
  "🦇 Твої слова пахнуть злом глибше, ніж Підземелля.",
  "🌑 Під покровом ночі не смій так лаятись, авантюрець.",
  "⚔️ Словесний поєдинок завершено, переможець — Цензура.",
  "🛑 Піт-стоп для твоїх висловлювань — пора перезавантажитись.",
  "🏆 Кращий час на колі, але словесний штраф за лайку.",
  "🏎️ Ти на межі — слова швидкі, але контроль потрібен.",
  "⚠️ Твоя лайка — ніби зіткнення на стартовій прямій.",
  "🕸️ Забруднення мережі лексикою вимагає чистки пакету.",
  "🛡️ IDS виявив аномалії в твоїй мові, блокую транзакцію.",
  "⚡ Потік даних зупинено через некоректний протокол комунікації.",
  "🛠️ Перезапуск мовного сервера рекомендується після такої пакети.",
  "❌ Пінг твого лексикону перевищує допустимий TTL.",
  "📡 Пропускна здатність для такого контенту вичерпана.",
  "🔒 Firewall активовано — твоя лайка заблокована.",
  "⚠️ Warning: вхідний трафік містить заборонені дані, виконується drop.",
  "🚫 Пакет твоїх слів відхилено через політику фільтрації.",
  "⚔️ Боги хаосу схвалюють твої слова",
];

function getRandomReply() {
  return naughtyReplies[Math.floor(Math.random() * naughtyReplies.length)];
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[@aа]/g, "а")
    .replace(/[еєe]/g, "е")
    .replace(/[iі1!|]/g, "і")
    .replace(/[oо0]/g, "о")
    .replace(/[cс]/g, "с")
    .replace(/[pр]/g, "р")
    .replace(/[yу]/g, "у")
    .replace(/[xх]/g, "х")
    .replace(/[^a-zа-яёїєґ0-9]/gi, "") // видаляє сміття
    .replace(/(.)\1{2,}/g, "$1"); // стискає повтори
}

// Перевірка
function containsBadWord(text: string): boolean {
  const normalized = normalize(text);
  for (const badWord of BAD_WORDS) {
    if (normalized.includes(badWord)) {
      return true;
    }
  }
  return false;
}

export function registerBadWordsHandler(bot: Telegraf) {
  bot.on("text", async (ctx, next) => {
    const userId = ctx.from?.id;
    const username = ctx.from?.username || ctx.from?.first_name;
    const chatId = ctx.chat.id.toString();
    const text = ctx.message.text.toLowerCase();

    if (!userId || !chatId) {
      return next();
    }

    if (!containsBadWord(text)) {
      return next();
    }

    // Збереження в базу
    const userRepository = AppDataSource.getRepository(User);
    const chatUserStatRepository = AppDataSource.getRepository(ChatUserStat);

    let user = await userRepository.findOneBy({ telegramId: userId });
    if (!user) {
      user = userRepository.create({ telegramId: userId, username });
      await userRepository.save(user);
    }

    let chatUserStat = await chatUserStatRepository.findOne({
      where: { user, chatId },
    });
    if (!chatUserStat) {
      chatUserStat = chatUserStatRepository.create({
        user,
        chatId,
        messageCount: 0,
        badWordCount: 1,
      });
      await chatUserStatRepository.save(chatUserStat);
    } else {
      chatUserStat.badWordCount = (chatUserStat.badWordCount || 0) + 1;
      await chatUserStatRepository.save(chatUserStat);
    }

    await ctx.reply(getRandomReply());
    await next();
  });
}

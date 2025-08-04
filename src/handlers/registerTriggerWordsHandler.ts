import { Telegraf } from "telegraf";
import { TRIGGER_WORDS } from "../constants/wordLists";

const responses = [
  "🚨 Ключове слово активовано. Відкриваю портали...",
  "👾 Сканер вловив підозрілу активність. Завантажую протокол Alpha.",
  "🧙‍♂️ Заборонене закляття вимовлено. Магічна рада вже в курсі.",
  "🕶️ Агент Сміт уже в дорозі. Залишайся на місці.",
  "💾 Слово розпаковано. Створено резервну копію реальності.",
  "🪐 Активовано міжгалактичний маяк. Чекай гостей.",
  "🧠 Сигнал передано до Системи. Твій рейтинг нестабільний.",
  "🕵️‍♂️ Код прийнято. Розпочинаю невидиме спостереження.",
  "⛓️ Виявлено збій у мережевому лексиконі. Ініціюю корекцію.",
  "📦 Вміст повідомлення зашифровано та передано до ядра.",
  "⚡ Когнітивна буря наближається. Твої слова — її початок.",
  "🎯 Потрапляння в цільове слово. Система задоволена.",
  "🔬 Проведено експрес-аналіз. Зміст викликає занепокоєння.",
  "🎛️ Фільтри тривоги дали збій. Увімкнено ручне втручання.",
  "🌌 Слова резонують з темною матерією. Перевіряю багатовимірність.",
  "🎲 RNG сказав «так». Повідомлення видалено для безпеки.",
  "📉 Репутаційний індекс знижено. Обережніше з формулюваннями.",
  "🛰️ Ініціативу перехоплено. Ти занадто близько до істини.",
  "🎮 Гравець активував заборонене комбо. Застосовую штраф.",
  "🧬 Твоя фраза порушила мовний геном. Починаю мутацію відповідей.",
];

function getTriggerReply(): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

function containsTriggerWord(text: string): boolean {
  // нижній регістр, але не видаляємо пунктуацію
  const lowered = text.toLowerCase();

  for (const triggerWords of TRIGGER_WORDS) {
    const pattern = new RegExp(
      `(^|\\s|[!?,.():;"'-])${triggerWords}([!?,.():;"'-]|\\s|$)`,
      "iu",
    );
    if (pattern.test(lowered)) {
      return true;
    }
  }
  return false;
}

export function registerTriggerWordsHandler(bot: Telegraf) {
  bot.on("text", async (ctx, next) => {
    const text = ctx.message.text;
    if (!text || !containsTriggerWord(text)) {
      return next();
    }

    try {
      await ctx.deleteMessage();
    } catch (error) {
      console.error("❌ Не вдалося видалити повідомлення:", error);
    }

    try {
      await ctx.reply(getTriggerReply());
    } catch (err) {
      console.error("❌ Не вдалося надіслати тригер-відповідь:", err);
    }

    await next();
  });
}

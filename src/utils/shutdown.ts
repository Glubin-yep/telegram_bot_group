import { bot } from "../bot";

export async function shutdownBot() {
  console.log("Отримано сигнал завершення, надсилаю 'бб'...");

  const shutdownChatId = process.env.PRIMARY_CHAT_ID;

  if (!shutdownChatId) {
    console.error("PRIMARY_CHAT_ID is not set in .env. Cannot send shutdown message.");
  } else {
    try {
      await bot.telegram.sendMessage(shutdownChatId, "Радий служити, хазяїне 🙇");
    } catch (error) {
      console.error("Не вдалося надіслати повідомлення:", error);
    }
  }

  console.log("Завершую роботу бота...");
  await bot.stop();
  process.exit(0);
}

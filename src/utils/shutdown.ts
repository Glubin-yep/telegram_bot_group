import { bot } from "../bot";

export async function shutdownBot() {
  console.log("Отримано сигнал завершення, надсилаю 'бб'...");

  const shutdownChatId = -1002779239533;

  try {
    await bot.telegram.sendMessage(shutdownChatId, "Радий служити, хазяїне 🙇");
  } catch (error) {
    console.error("Не вдалося надіслати повідомлення:", error);
  } finally {
    console.log("Завершую роботу бота...");
    await bot.stop();
    process.exit(0);
  }
}

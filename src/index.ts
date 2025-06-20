import { bot } from "./bot";
import { AppDataSource } from "./db";
import { shutdownBot } from "./utils/shutdown";

process.once("SIGINT", shutdownBot);
process.once("SIGTERM", shutdownBot);

AppDataSource.initialize()
  .then(() => {
    console.log("✅ З'єднання з базою даних встановлено.");
    bot.launch();
  })
  .catch((error) => {
    console.error("❌ Помилка при запуску бази даних:", error);
  });

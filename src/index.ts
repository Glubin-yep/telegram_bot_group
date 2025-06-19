import { bot } from "./bot";
import { shutdownBot } from "./utils/shutdown";

process.once("SIGINT", shutdownBot);
process.once("SIGTERM", shutdownBot);

bot.launch();

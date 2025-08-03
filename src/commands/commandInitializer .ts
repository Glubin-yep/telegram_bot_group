import { Telegraf } from "telegraf";
import stats from "./stats";
import groupstats from "./groupstats";
import ruina from "./ruina";
import steam from "./steam";
import { sendJoke } from "./joke";
import { ConvertToBinery } from "./convertTo";
import { registerMcStatusCommand } from "./minecraftServer";
import { registerGeneralCommands } from "./generalCommands";

export default function BotCommandInitializer(bot: Telegraf) {
  registerGeneralCommands(bot);
  stats(bot);
  groupstats(bot);
  ruina(bot);
  steam(bot);
  sendJoke(bot);
  ConvertToBinery(bot);
  registerMcStatusCommand(bot);
}

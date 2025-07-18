import { Telegraf } from "telegraf";
import stats from "./stats";
import groupstats from "./groupstats";
import ruina from "./ruina";
import steam from "./steam";
import { sendJoke } from "./joke";

export function registerCommands(bot: Telegraf) {
  stats(bot);
  groupstats(bot);
  ruina(bot);
  steam(bot);
  sendJoke(bot);
}

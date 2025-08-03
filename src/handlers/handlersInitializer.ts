import { Telegraf } from "telegraf";
import { registerHears } from "./hearsHandler";
import { registerBadWordsHandler } from "./badWordsHandler";
import { registerTriggerWordsHandler } from "./registerTriggerWordsHandler";
import { registerTextHandler } from "./textHandler";

export default function BotHandlersInitializer(bot: Telegraf) {
    registerHears(bot);
    registerTextHandler(bot);
    registerBadWordsHandler(bot);
    registerTriggerWordsHandler(bot);
}

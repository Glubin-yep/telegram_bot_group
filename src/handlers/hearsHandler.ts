import { Telegraf } from "telegraf";

export function registerHears(bot: Telegraf) {
  bot.hears(/привіт[,!.\s]*добі|добі[,!.\s]*привіт/i, (ctx) => {
    const userId = ctx.from?.id;

    switch (userId) {
      case 1934396453:
        ctx.reply("Слава найкращому розробнику всіх часів!");
        break;
      case 638208656:
        ctx.reply("О, повелителю React і TypeScript, Добі вітає вас поклоном!");
        break;
      case 1432844909:
        ctx.reply(
          "⚔️ Слава імператору! Стратег всіх часів, Добі схиляється перед тобою. Весь сектор безпечний... поки ти в онлайні.",
        );
        break;
      default:
        ctx.reply(`Я тебе не знаю а ну киш`);
        break;
    }
  });

  bot.hears("🧦", (ctx) => {
    const photoUrl = "https://t1.ua/photos/articles/2019/06/28863_1_1097.jpg";
    const caption = "Ура, тепер Добі вільний! 🧦";

    return ctx.replyWithPhoto(photoUrl, {
      caption,
      parse_mode: "HTML",
    });
  });
}

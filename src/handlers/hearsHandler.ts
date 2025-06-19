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
    const photoUrl =
      "https://static.wikia.nocookie.net/harrypotter/images/e/e7/%D0%94%D0%BE%D0%B1%D0%B8_%D0%B2_%D0%B1%D0%BE%D0%BB%D1%8C%D0%BD%D0%B8%D1%87%D0%BD%D0%BE%D0%BC_%D0%BA%D1%80%D1%8B%D0%BB%D0%B5.jpg/revision/latest/scale-to-width-down/250?cb=20130526075504&path-prefix=ru";
    const caption = "Ура, тепер Добі вільний! 🧦";

    return ctx.replyWithPhoto(photoUrl, {
      caption,
      parse_mode: "HTML",
    });
  });
}

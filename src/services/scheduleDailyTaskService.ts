import { Telegraf } from "telegraf";
import { getRandomHoroscope } from "../commands/horoscopes";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import cron from "node-cron";

export async function scheduleDailyHoroscopes(bot: Telegraf) {
    cron.schedule("0 10 * * *", async () => {
        console.log("Запускаємо щоденну розсилку гороскопів...");

        const userRepo = AppDataSource.getRepository(User);
        const users = await userRepo.find();

        for (const user of users) {
            const horoscope = getRandomHoroscope();
            const username = user.username || "користувачу";

            const personalizedText = `🔮 Привіт, @${username}!\n\nВаш щоденний гороскоп:\n${horoscope}`;

            const broadcastChatId = process.env.PRIMARY_CHAT_ID;
            if (!broadcastChatId) {
                console.error("PRIMARY_CHAT_ID is not set in .env. Cannot send horoscopes.");
                continue;
            }

            try {
                await bot.telegram.sendMessage(broadcastChatId, personalizedText);
            } catch (err) {
                console.error(`Не вдалося надіслати користувачу ${user.telegramId}:`, err);
            }
        }
    });
}

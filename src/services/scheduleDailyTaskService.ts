import { Telegraf } from "telegraf";
import { getRandomHoroscope } from "../commands/horoscopes";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import cron from "node-cron";

export async function scheduleDailyHoroscopes(bot: Telegraf) {
    cron.schedule("0 9 * * *", async () => {
        console.log("Запускаємо щоденну розсилку гороскопів...");

        const userRepo = AppDataSource.getRepository(User);
        const users = await userRepo.find();

        for (const user of users) {
            const horoscope = getRandomHoroscope();
            const username = user.username || "користувачу";

            const personalizedText = `🔮 Привіт, @${username}!\n\nВаш щоденний гороскоп:\n${horoscope}`;

            try {
                await bot.telegram.sendMessage("-1002779239533", personalizedText);
            } catch (err) {
                console.error(`Не вдалося надіслати користувачу ${user.telegramId}:`, err);
            }
        }
    });
}

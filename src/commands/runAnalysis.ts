import { Telegraf } from "telegraf";
import { sendMessage } from "../services/messageService";
import { spawn } from "child_process";
import * as path from "path";
import * as fs from "fs/promises";
import { setTimeout } from "timers/promises";

const PROJECT_ROOT = path.join(__dirname, '..', '..');

const ANALYZER_PATH = path.join(PROJECT_ROOT, 'chat_stats_viz');
const PYTHON_SCRIPT = path.join(ANALYZER_PATH, "chat_stats_viz.py");
const JSON_FILE = path.join(ANALYZER_PATH, "result.json");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "output");

export function registerAnalysisCommand(bot: Telegraf) {
    bot.command("runanalysis", async (ctx) => {

        if (ctx.from?.id.toString() !== process.env.ADMIN_ID) {
            return sendMessage(ctx, "🚫 Ви не мій господар. Ця команда для адмінів.");
        }

        await sendMessage(ctx, "⏳ Починаю глибокий аналіз... Це може зайняти хвилину.");

        const pythonProcess = spawn("python", [PYTHON_SCRIPT, JSON_FILE], {
            env: {
                ...process.env,
                "PYTHONIOENCODING": "utf-8",
            },
        });

        let scriptOutput = "";
        pythonProcess.stdout.on("data", (data) => {
            scriptOutput += data.toString();
        });
        pythonProcess.stderr.on("data", (data) => {
            scriptOutput += data.toString();
        });

        pythonProcess.on("close", async (code) => {
            if (code !== 0) {
                await sendMessage(ctx, `❌ Помилка під час аналізу:\n\n${scriptOutput}`);
                return;
            }

            try {
                await sendMessage(ctx, "✅ Аналіз завершено! Надсилаю графіки...");

                // Список файлів, які ми хочемо надіслати
                const allFiles = await fs.readdir(OUTPUT_DIR);

                const generalFiles = ["starters.png", "timeline.png", "mean_response.png"];
                for (const file of generalFiles) {
                    const filePath = path.join(OUTPUT_DIR, file);
                    try {
                        await ctx.replyWithPhoto({ source: filePath });
                    } catch (e) {
                        console.error(`Не вдалося надіслати файл ${file}:`, e);
                    }
                }

                const tableFiles = allFiles.filter(f =>
                    f.startsWith("table_")
                );

                if (tableFiles.length === 0) {
                    await sendMessage(ctx, "Не знайдено згенерованих таблиць слів/емодзі.");
                }

                for (const file of tableFiles) {
                    const filePath = path.join(OUTPUT_DIR, file);
                    try {
                        await setTimeout(500);
                        await ctx.replyWithPhoto({ source: filePath });
                    } catch (e) {
                        console.error(`Не вдалося надіслати файл ${file}:`, e);
                    }
                }

                await sendMessage(ctx, "Всі звіти надіслано!");

            } catch (error) {
                console.error(error);
                await sendMessage(ctx, "❌ Помилка під час надсилання результатів.");
            }
        });
    });
}
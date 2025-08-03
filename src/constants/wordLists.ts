import fs from "fs";
import path from "path";

export const BAD_WORDS: Set<string> = new Set(
    fs
        .readFileSync(path.join(__dirname, "constants/badWords.txt"), "utf-8")
        .split(/\r?\n/)
        .map((line) => line.trim().toLowerCase())
        .filter(Boolean), // видаляємо порожні рядки
);

export const TRIGGER_WORDS: Set<string> = new Set(
    fs
        .readFileSync(path.join(__dirname, "constants/triggerWords.txt"), "utf-8")
        .split(/\r?\n/)
        .map((line) => line.trim().toLowerCase())
        .filter(Boolean), // видаляємо порожні рядки
);
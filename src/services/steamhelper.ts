import axios from "axios";

type PlayerSummary = string | { photoUrl: string; caption: string };

export async function getPlayerSummary(
  steamId: string,
): Promise<PlayerSummary> {
  try {
    const response = await axios.get(
      "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/",
      {
        params: {
          key: process.env.STEAM_API_KEY,
          steamids: steamId,
        },
      },
    );

    const player = response.data.response.players[0];
    if (!player) {
      return "Користувача не знайдено у Steam.";
    }

    if (player.gameextrainfo) {
      return {
        photoUrl: player.avatarfull,
        caption: `🎮 ${player.personaname}\n Зараз грає в: ${player.gameextrainfo}`,
      };
    } else {
      return {
        photoUrl: player.avatarfull,
        caption: `👤 ${player.personaname} наразі не грає.`,
      };
    }
  } catch (error) {
    console.error("Помилка при отриманні статусу:", error);
    return `⚠️ Не вдалося отримати статус. (${error})`;
  }
}

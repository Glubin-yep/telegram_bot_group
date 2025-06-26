import axios from "axios";

export async function getRandomJoke(): Promise<string> {
  try {
    const response = await axios.get(
      "https://v2.jokeapi.dev/joke/Programming,Dark",
    );
    const data = response.data;

    if (data.type === "single") {
      return data.joke;
    } else if (data.type === "twopart") {
      return `${data.setup}\n${data.delivery}`;
    } else {
      return "Не вдалося отримати жарт. Спробуйте пізніше.";
    }
  } catch (error) {
    console.error(error);
    return "Сталася помилка при отриманні жарту.";
  }
}

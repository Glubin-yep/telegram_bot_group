import axios from "axios";

export async function getRandomMeme(): Promise<MemeApiResponse> {
    const { data } = await axios.get<MemeApiResponse>("https://meme-api.com/gimme/ProgrammerHumor");
    return data;
}

export interface MemeApiResponse {
    postLink: string;
    subreddit: string;
    title: string;
    url: string;
    nsfw: boolean;
    spoiler: boolean;
    author: string;
    ups: number;
    preview: string[];
}
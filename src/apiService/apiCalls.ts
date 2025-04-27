import axios from "axios";

export async function fetchRandomQuote(url: string) {
  const res = await axios.get(url);
  return res.data;
}

import axios from 'axios';
import { parse } from 'node-html-parser';

export async function scrape(url: string) {
  const res = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
  });

  const html = res.data;
  return parse(html);
}

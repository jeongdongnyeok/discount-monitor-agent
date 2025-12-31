import axios from 'axios';
import cheerio from 'cheerio';

export async function scrape(url: string) {
  const res = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
  });

  const html = res.data;
  return cheerio.load(html);
}

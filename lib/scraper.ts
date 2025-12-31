import cheerio from 'cheerio';

export async function scrape(url: string) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
    cache: 'no-store',
  });

  const html = await res.text();
  return cheerio.load(html);
}

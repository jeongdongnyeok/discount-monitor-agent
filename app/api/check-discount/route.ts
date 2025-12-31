import { targets } from '../../../lib/targets';
import { scrape } from '../../../lib/scraper';
import { judge } from '../../../lib/judge';
import { sendTelegram } from '../../../lib/telegram';

export async function GET() {
  for (const target of targets) {
    try {
      const $ = await scrape(target.url);
      const triggered = judge($ as any, target as any);
      if (triggered) {
        await sendTelegram(`Discount triggered!\n${target.name}\n${target.url}`);
      }
    } catch (e) {
      console.error(target.name, e);
    }
  }
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

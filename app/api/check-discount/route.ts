import { targets } from '@/lib/targets';
import { scrape } from '@/lib/scraper';
import { judge } from '@/lib/judge';
import { sendTelegram } from '@/lib/telegram';

export async function GET() {
  for (const target of targets) {
    try {
      const $ = await scrape(target.url);
      const triggered = judge($ as any, target as any);
      if (triggered) {
        await sendTelegram(`\uD83D\uDD25 할인 트리거!\n${target.name}\n${target.url}`);
      }
    } catch (e) {
      console.error(target.name, e);
    }
  }
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

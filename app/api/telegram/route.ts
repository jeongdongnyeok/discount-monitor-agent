import { targets } from '../../../lib/targets';
import { scrape } from '../../../lib/scraper';
import { judge } from '../../../lib/judge';
import { sendTelegram } from '../../../lib/telegram';

export async function POST(request: Request) {
  const body = await request.json();
  const message = body.message?.text?.trim().toLowerCase();
  const chatId = body.message?.chat?.id;

  if (message === 'check!' && chatId) {
    for (const target of targets) {
      try {
        const root = await scrape(target.url);
        const triggered = judge(root as any, target as any);
        if (triggered) {
          await sendTelegram(`🔥 할인 특정화!\n${target.name}\n${target.url}`);
        } else {
          await sendTelegram(`현재 할인 중이 아니입니다: ${target.name}`);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
  return new Response('OK');
}

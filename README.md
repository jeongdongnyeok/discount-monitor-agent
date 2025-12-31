# Discount Monitor Agent

This project implements a serverless agent that monitors product pages for discounts and sends Telegram notifications. It is designed to run on a Next.js (App Router) backend and can be deployed to Vercel with no persistent state.

## Features

- **Scheduled discount checks**: A Vercel cron job calls `/api/check-discount` every day at 02:00 KST (17:00 UTC).  The route scrapes each target URL defined in `lib/targets.ts`, applies a rule to determine if a discount has started (for example, the presence of a `<del>` element signalling a sale price), and sends a notification via Telegram when a discount is detected.
- **Manual trigger via Telegram**: In addition to the scheduled job, you can send `check!` to your Telegram bot.  The webhook at `/api/telegram` receives the message, runs the same discount check immediately and sends a message back indicating whether a discount is active.
- **Environment-driven configuration**: All sensitive values are provided via environment variables:
  - `TG_TOKEN` – your Telegram bot token.
  - `TG_CHAT_ID` – the chat ID where notifications should be sent.
  - `TARGET_URL` – the URL of the product search page to monitor.  You can modify this to point to any product page that uses a strike-through (`<del>`) element when items go on sale.

A sample `.env.example` file is included for reference.

## Project structure

- `app/api/check-discount/route.ts` – serverless API route invoked by the Vercel cron.  It iterates through the targets, scrapes their pages, runs the rule engine and sends notifications when needed.
- `app/api/telegram/route.ts` – webhook endpoint for Telegram.  When it receives a `POST` request with the message text `check!`, it triggers an immediate discount check.
- `lib/targets.ts` – defines the list of targets to monitor.  Reads `process.env.TARGET_URL` as a fallback to allow dynamic configuration.
- `lib/scraper.ts` – fetches HTML via `axios` and parses it with `node-html-parser`.
- `lib/judge.ts` – contains rule logic to determine whether a discount has occurred.
- `lib/telegram.ts` – helper to send messages via the Telegram Bot API using `axios`.

## Running locally

1. Clone this repository:
   ```bash
   git clone https://github.com/jeongdongnyeok/discount-monitor-agent.git
   cd discount-monitor-agent
   ```
2. Create a `.env` file in the project root and populate it with your configuration:
   ```
   TG_TOKEN=your-telegram-bot-token
   TG_CHAT_ID=your-chat-id
   TARGET_URL=https://www.zara.com/kr/ko/search?searchTerm=AARON%20LEVINE&section=MAN
   ```
3. Install dependencies and start the development server:
   ```bash
   npm install
   npm run dev
   ```
4. Open `http://localhost:3000/api/check-discount` in a browser to trigger a manual check.

## Deployment

This project is intended for deployment on Vercel:

- The `vercel.json` file sets up a cron job to call `/api/check-discount` every day at 17:00 UTC (02:00 KST).
- Set `TG_TOKEN`, `TG_CHAT_ID` and `TARGET_URL` as environment variables in your Vercel project.
- To enable the Telegram manual trigger, set your bot’s webhook to point at your deployment’s `/api/telegram` endpoint:
  ```
  https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://<your-vercel-domain>/api/telegram
  ```

After deployment, the agent will automatically check for discounts at the scheduled time and respond to `check!` messages in Telegram.

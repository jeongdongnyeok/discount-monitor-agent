import axios from 'axios';

export async function sendTelegram(message: string) {
  const token = process.env.TG_TOKEN;
  const chatId = process.env.TG_CHAT_ID;
  if (!token || !chatId) {
    console.error('Missing TG_TOKEN or TG_CHAT_ID');
    return;
  }
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  await axios.post(url, {
    chat_id: chatId,
    text: message,
  });
}

const axios = require('axios');
require('dotenv').config();
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // Set this in your environment
const CHAT_ID = process.env.CHAT_ID; // Set this in your environment
async function sendTelegramMessage(message) {
  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
    });
  } catch (error) {
    console.error('Failed to send message to Telegram:', error);
  }
}

module.exports = { sendTelegramMessage };

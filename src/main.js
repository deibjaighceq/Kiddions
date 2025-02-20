const { Worker, isMainThread, workerData } = require('worker_threads');
const { loadTokens } = require('./utils/tokenLoader');
const { logError, logInfo } = require('./utils/logger');
const { runAutomation } = require('./workers/automationWorker');
const colors = require('colors');
const axios = require('axios');
const { sendTelegramMessage } = require('./utils/tg');
require('dotenv').config();

// Use environment variables for sensitive information

function displayHeader() {
  process.stdout.write('\x1Bc');
  console.log(colors.cyan('========================================'));
  console.log(colors.cyan('=          Silent Protocol Bot         ='));
  console.log(colors.cyan('=     Created by HappyCuanAirdrop      ='));
  console.log(colors.cyan('=    https://t.me/HappyCuanAirdrop     ='));
  console.log(colors.cyan('========================================'));
  console.log();
}

const delay = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));


async function main() {
  displayHeader();
  console.log(colors.yellow(`Please wait...\n`));
  await delay(3000);

  const tokens = loadTokens();
  if (tokens.length === 0) {
    const errorMessage = '❌ No tokens available. Exiting.';
    logError(errorMessage);
    return;
  }

  tokens.forEach((token) => {
    const worker = new Worker(__filename, { workerData: token });
    worker.on('message', async (message) => {
      console.log(message);
      logInfo(message);
    });
    worker.on('error', async (error) => {
      const errorMessage = `❌ Worker error: ${error.message || error}`;
      logError(errorMessage);
    });
    worker.on('exit', async (code) => {
      if (code !== 0) {
        const exitMessage = `❌ Worker stopped with exit code ${code}`;
        logError(exitMessage);
      }
    });
  });
}

if (isMainThread) {
  main();
} else {
  const token = workerData;
  runAutomation(token).catch(async (err) => {
    const errorMessage = `❌ Worker error: ${err.message || err}`;
    logError(errorMessage);
  });
}


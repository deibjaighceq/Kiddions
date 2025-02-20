const colors = require('colors');
const moment = require('moment');
const { sendTelegramMessage } = require('./tg');

colors.setTheme({
  info: 'cyan',
  success: 'green',
  error: 'red',
  warn: 'yellow',
  debug: 'blue',
  timestamp: 'gray',
});


function logInfo(message) {
  sendTelegramMessage(message);
  console.log(colors.info(`🕒 [${moment().format('HH:mm:ss')}] => ${message}`));
}

function logSuccess(message) {
  sendTelegramMessage(message);
  console.log(
    colors.success(`🕒 [${moment().format('HH:mm:ss')}] => ${message}`)
  );
}

function logError(message) {
  sendTelegramMessage(message);
  console.error(
    colors.error(`🕒 [${moment().format('HH:mm:ss')}] => ${message}`)
  );
}

function logWarn(message) {
  sendTelegramMessage(message);
  console.log(colors.warn(`🕒 [${moment().format('HH:mm:ss')}] => ${message}`));
}

module.exports = { logInfo, logSuccess, logError, logWarn };

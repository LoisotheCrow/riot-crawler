const colors = require('colors/safe');
const moment = require('moment');

const log = (type, message) => {
  let msg = `[${moment().format()}] `;
  if (type === 'error' || type === 'API error') {
    msg += colors.red(type);
  } else {
    msg += colors.green(type);
  }
  msg += ' ';
  msg += message;
  console.log(msg);
};

module.exports = {
  log,
};

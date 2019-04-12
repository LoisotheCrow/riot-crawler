const _connectConfig = () => {
  const config = require('./config');
  const path = require('path');
  const fs = require('fs');
  const parseArgs = require('minimist');

  const args = parseArgs(process.argv.slice(2));

  const { config: configPath } = args;

  if (configPath) {
    const isAbsolute = configPath[0] === '/';
    const parsedPath = isAbsolute ? configPath : path.join(__dirname, '../', configPath);
    if (fs.existsSync(parsedPath)) {
      conf.file({ file: parsedPath });
    } else {
      const errorText = `${Date.now()}: error - Configuration file \'${parsedPath}\' could not be located`;
      console.log(`${errorText}, no logging path specified!`);
      process.exit(1);
    }
  }
};

const _init = () => {
  const logger = require('./logger');

  logger.log('build', 'Initializing application.');

  const started = Date.now();
  try {
    const createControlPanel = require('./application/control/createControlServer');
    createControlPanel();
    logger.log('build', `Initialized application in ${Date.now() - started}ms.`);
  } catch ({ message }) {
    const { exit } = process;
    logger.log('error', `Got error while initializing: ${message}.`);
    exit(1);
  }
};

try {
  _connectConfig();
} catch (err) {
  console.log(`Error connecting configuration: ${err.message}`);
}

_init();

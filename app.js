const logger = require('./logger');

const _init = () => {
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

_init()

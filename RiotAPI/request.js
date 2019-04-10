const axios = require('axios');
const isEmpty = require('lodash/isEmpty');
const logger = require('../logger');
const { entryPoint, region, APIKey } = require('../config');

const requestAPI = async (url, params = {}) => {
  const baseUrl = `https://${region}.${entryPoint}`;
  const fullUrl = `${baseUrl}/${url}?api_key=${APIKey}`;

  const _request = async () => {
    const started = Date.now();
    logger.log(
      'API',
      `Requesting ${url} method of RIOT API${isEmpty(params) ? '.' : `with params: ${JSON.stringify(params)}`}`,
    );
    let result = { status: 1 };
    try {
      const { data } = await axios({
        url: fullUrl,
        params,
      });
      logger.log('API', `Successfully finished request in ${Date.now() - started}ms, response data:`);
      logger.log('API', data ? JSON.stringify(data) : 'No data.');
      result = {
        status: 0,
        data,
      };
    } catch ({ response, message }) {
      if (!response) {
        logger.log('API error', `Failed in ${Date.now() - started}ms with unknown error: ${message}`);
        result = {
          status: 1,
          error: message,
        };
      } else {
        const { status, statusText = 'Unspecified status' } = response;
        logger.log('API error', `Failed in ${Date.now() - started}ms with status ${status}: ${statusText}.`);
        result = {
          status: 1,
          error: `${status}: ${statusText}.`,
        };
      }
    }
    return result;
  };

  return _request();
};

module.exports = requestAPI;

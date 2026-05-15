const chalk = require('chalk')
const { includesAnyStringInURL } = require('../matchers');
const { config } = require('../config-watcher');

// czy dane żądanie powinno failować?
const shouldFail = () => Math.random() < config.failing.probability

const fail = function (req, res, next) {
  // switch off in runtime
  if (!config.failing.active){
    return next()
  }

  if (req.method == 'OPTIONS'){
    return next()
  } else  if (shouldFail() && includesAnyStringInURL(req, ...config.failing.URLIncludes)) {
    res.statusCode = config.failing.status;
    res.statusMessage = 'CHAOS DUDE!';
    res.send()
    console.log('[debug] Failing %s with code %s ', chalk.red(`${req.method} ${req.originalUrl}`), config.failing.status);
  } else {
    return next()
  }
};

module.exports = {
  fail
}

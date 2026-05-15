const chalk = require('chalk')
const { config } = require('../config-watcher');
const { includesAnyStringInURL } = require('../matchers');

const getDelayLength = () => {
  const { delaying: { delay: [delayMin, delayMax] } } = config;
  return Math.round(delayMin + Math.random() * (delayMax - delayMin))
}

const delay = function (req, res, next) {
  // switch off in runtime
  if (!config.delaying.active){
    return next()
  }

  if (includesAnyStringInURL(req, ...config.delaying.URLIncludes)) {
    const delayLength = getDelayLength()
    console.log('[debug] Delaying %s for %sms ', chalk.green(`${req.method} ${req.originalUrl}`), delayLength);
    setTimeout(next, delayLength);
  } else {
    next()
  }
};

module.exports = {
  delay
}

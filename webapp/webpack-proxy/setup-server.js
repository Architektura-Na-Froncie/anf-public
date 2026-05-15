const { delay } = require('./middlewares/delay');
const { fail } = require('./middlewares/fail');
const { configWatcher } = require('./config-watcher');

const setupServer = (app) => {
  // middlewares are always active
  // if config hot reload switches a middleware off, the middleware will be still there, will just do a pass-through
  app.use(delay)
  app.use(fail)
  configWatcher()
}

module.exports = setupServer;

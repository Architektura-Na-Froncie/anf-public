const argv = require('yargs')
  .option('port', {
    alias: 'p',
    default: 3000,
    describe: 'Service port',
    type: 'number'
  })
  .option('delay', {
    alias: 'd',
    default: '500:1000',
    describe: 'Delay range (random, from-to)',
    type: 'string'
  })
  .option('fail', {
    alias: 'f',
    default: 0,
    describe: 'Probability of requests to randomly fail (0..1)',
    type: 'number'
  })
  .option('failUrls', {
    default: null,
    describe: 'Comma-separated list of pattern-matched urls to randomly fail',
    type: 'string'
  })
  .option('auth', {
    alias: 'a',
    default: false,
    describe: 'JWT Auth is required (Authorization Bearer <token>)',
    type: 'boolean'
  })
  .option('collaborativeService', {
    alias: 'coll',
    default: false,
    describe: 'Run Collaborative Service',
    type: 'boolean'
  })
  .option('currencyService', {
    alias: 'curr',
    default: false,
    describe: 'Run Currency Service',
    type: 'boolean'
  })
  .argv

module.exports = {
  argv
}

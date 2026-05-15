const pause = require('connect-pause')
const { logDebug, logConfig } = require('../lib/util')

module.exports = ({ from, to }) => {
  from = parseInt(from)
  to = parseInt(to)
  logConfig(`Delaying request within range [ ${from}, ${to} ]`)
  const diff = Math.max(to - from, 0)
  const getDelay = () => from + Math.round(Math.random() * diff)

  return function delay(req, res, next) {
    const delayMS = getDelay()
    logDebug(`HTTP ${req.method} ${req.url} delayed by ${delayMS}`)
    pause(delayMS)(req, res, next)
  }
}

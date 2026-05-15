const chalk = require('chalk')

const includesStringInURL = (req, phrase) =>
  req.originalUrl.includes(phrase)

const includesAnyStringInURL = (req, ...phrases) => {
  for (const phrase of phrases){
    const found = req.originalUrl.includes(phrase)
    if (found) {
      console.log('[debug] Matched %s against %s ', chalk.yellow(`${req.method} ${req.originalUrl}`), chalk.yellow(phrase));
      return true
    }
  }
  return false
}

module.exports = {
  includesStringInURL,
  includesAnyStringInURL,
}

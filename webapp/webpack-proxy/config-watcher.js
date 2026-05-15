const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const chalk = require('chalk')

const config = require('./chaos.json');

const configPath = path.join(__dirname, 'chaos.json');

// pojedyncze nadpisanie configa
const syncConfig = () => {
  try {
    const newConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    const changed = !_.isEqual(config, newConfig)
    if (changed) {
      Object.assign(config, newConfig)
      console.log(`PROXY > Synchronised config: ${chalk.cyan(JSON.stringify(config, null, 2))}`)
    }
  } catch (e) {
    console.error(`PROXY > Unable to parse config: ${chalk.red(e.message)}`)
  }
}
console.log(`PROXY > Loaded initial config: ${ chalk.cyan(JSON.stringify(config, null, 2)) }`)

const configWatcher = () => {
  // nadpisz configa w interwale == synchronizuj zawartość pliku z tym, co jest wykorzystywane przez webpack proxy w realtime
  const timeoutID = setInterval(syncConfig, 5000)
  console.log('PROXY > Will sync each 5 seconds')

  return () => clearTimeout(timeoutID)
}

module.exports = {
  config,
  configWatcher,
}

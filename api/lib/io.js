const fs = require('fs')

const writeFileSync = (content, filepath) => {
  fs.writeFileSync(filepath, JSON.stringify(content, null, 2), 'utf8')  
}

module.exports = {
  writeFileSync,
}

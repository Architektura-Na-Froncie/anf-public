const { v4: uuid } = require('uuid')

let SECRET = uuid()

const getSecret = () => SECRET

const resetSecret = () => {
  SECRET = uuid()
}

module.exports = {
  getSecret,
  resetSecret,
}

const express = require('express')

const router = express.Router()
const registerLogin = require('./login')
registerLogin(router)

module.exports = router

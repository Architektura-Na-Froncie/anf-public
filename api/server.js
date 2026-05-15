const path = require('path')

const jsonServer = require('json-server')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = jsonServer.create()
const jsonServerMiddlewares = jsonServer.defaults()
const jsonParser = bodyParser.json()

const DATABASE_FILE = 'db.local.json'
const router = jsonServer.router(DATABASE_FILE)
const countMiddleware = require('./middlewares/count')
const logsMiddleware = require('./middlewares/logs')

router.render = countMiddleware()

const { argv } = require('./lib/cli')
const { logInfo, logConfig } = require('./lib/util')

const pagingMiddleware = require('./middlewares/paging')
const delayingMiddleware = require('./middlewares/delaying')
const failingMiddleware = require('./middlewares/failing')
const errorMiddleware = require('./middlewares/error')

app.use(cors())
app.use(jsonParser, logsMiddleware)
app.use(jsonServer.rewriter(require('./routes.json')))
app.use(jsonServerMiddlewares)

// chaos engineering
const [from, to] = argv.delay.split(':')
app.use(delayingMiddleware({ from, to }))
app.use(pagingMiddleware(50, { excludePatterns: ['logs'] }))
app.use(failingMiddleware(argv.fail, argv.failUrls))

// logger UI
app.use('/logger', express.static(path.join(__dirname, 'logger')))

app.use(require('./middlewares/auth/authorize')(argv.auth))
app.use('/auth', require('./middlewares/auth'))
app.use('/banking', require('./middlewares/banking'))
app.use(require('./middlewares/exams'))
app.use(require('./middlewares/transfers'))
app.use(router)

app.use(errorMiddleware())

app.listen(argv.port, () => {
  logInfo(`JSON Server is running on http://localhost:${argv.p}`)
  logInfo(`Database loaded from file: ${DATABASE_FILE}`)
})

require('./collaborative/register-collaborative-service')(argv.collaborativeService)

require('./currency/register-currency-service')(argv.currencyService) // Socket.IO
// require('./currency/register-currency-service-ws')(argv.currencyService) // "czyste" websockety

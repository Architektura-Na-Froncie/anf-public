const http = require('http')
const socketIO = require('socket.io')

const { logConfig } = require('../lib/util')
const log = require('../lib/util').logCustom('CURRENCY SVC', 'magenta')

const currencySvc = require('./currency-service');
const { ServiceClients } = require('../lib/service-clients')

const registerCurrencyService = (active, CURRENCY_SVC_PORT = 3579) => {
  if (!active){
    logConfig(`Currency Service turned OFF`)
  } else {
    logConfig(`Currency Service turned ON (port: ${CURRENCY_SVC_PORT})`)
    currencySvc.start((currency, delta) => {
      log(`currency: ${currency}, delta: ${delta}`)
      clients.notifyAllIf('update', { currency, delta },
        (client) => {
          return client.data.currencies && client.data.currencies.includes(currency)
        }
      )
    });

    const server = http.createServer()
    const io = socketIO(server, {
      cors: {
        origin: 'http://localhost:3010',
        methods: ['GET', 'POST'],
        credentials: true
      }
    })
    const clients = new ServiceClients(log)
    server.listen(CURRENCY_SVC_PORT)

    io.on('connection', function(socket) {
      const id = clients.subscribe(socket)

      socket.on('request', function(request) {
        requestedCurrencies = request.currencies.map(c => c.toUpperCase());
        console.log(request.currencies)
        clients.update(id, { currencies: requestedCurrencies })
        log(`Client id:${id} requests updates on:`, requestedCurrencies);
        socket.emit('init', currencySvc.getRates(requestedCurrencies))
      });
      socket.on('disconnect', function () {
        clients.unsubscribe(id)
      });
    });
  }
}

module.exports = registerCurrencyService

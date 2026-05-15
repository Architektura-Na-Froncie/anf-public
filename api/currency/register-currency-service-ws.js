/* @ts-check */
const { WebSocketServer } = require('ws');

const { logConfig, logError } = require('../lib/util')
const log = require('../lib/util').logCustom('CURRENCY SVC', 'magenta')

const currencySvc = require('./currency-service');
const { ServiceClients } = require('../lib/service-clients')

const registerCurrencyService = (active, CURRENCY_SVC_PORT = 3579) => {
  if (!active){
    logConfig(`Currency Service (WebSocket) turned OFF`)
  } else {
    logConfig(`Currency Service (WebSocket) turned ON (port: ${CURRENCY_SVC_PORT})`)
    currencySvc.start((currency, delta) => {
      log(`currency: ${currency}, delta: ${delta}`)
      clients.notifyAllIf('update', { currency, delta },
        (client) => {
          return client.data.currencies && client.data.currencies.includes(currency)
        }
      )
    });

    const server = new WebSocketServer({ port: CURRENCY_SVC_PORT });
    const clients = new ServiceClients(log)

    server.on('connection', (socket) => {
      // Warstwa kleju potrzebna, żeby skorzystać z implementacji ServiceClients
      // oczekującej obiektu (socketu) z metodą emit()
      const emitter = {
        emit(type, data) {
          socket.send(JSON.stringify({ type, data }));
        }
      }
      const id = clients.subscribe(emitter);

      socket.on('message', (message) => {
        let type, data;

        try {
          ({ type, data } = JSON.parse(message.toString()) || {});
        } catch (e) {
          logError(`Parsing message failed: ${e.message}`);
          return;
        }

        if (type === 'request') {
          requestedCurrencies = data.currencies.map(c => c.toUpperCase());
          console.log(data.currencies)
          clients.update(id, { currencies: requestedCurrencies })
          log(`Client id:${id} requests updates on:`, requestedCurrencies);
          emitter.emit('init', currencySvc.getRates(requestedCurrencies));
          return;
        }
      });

      socket.on('close', function () {
        clients.unsubscribe(id)
      });
    });
  }
}

module.exports = registerCurrencyService

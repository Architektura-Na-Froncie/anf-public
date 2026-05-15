const http = require('http')
const socketIO = require('socket.io')

const { logConfig, randomID } = require('../lib/util')
const { ServiceClients } = require('../lib/service-clients')

const log = require('../lib/util').logCustom('COLLABORATIVE SVC', 'blue')

const registerCollaborativeService = (active, COLLABORATIVE_SVC_PORT = 3578) => {
  if (!active){
    logConfig(`COLLABORATIVE Service turned OFF`)
  } else {
    logConfig(`COLLABORATIVE Service turned ON (port: ${COLLABORATIVE_SVC_PORT})`)
    const server = http.createServer()
    const io = socketIO(server)
    const clients = new ServiceClients(log)
    server.listen(COLLABORATIVE_SVC_PORT)

    io.on('connection', (socket) => {
      const id = clients.subscribe(socket)

      socket.on('action', (data) => {
        const actionID = randomID();
        log(`received action: ${actionID} (${JSON.stringify(data)})`)
        log(`Broadcasting request ID:${actionID} starting`)
        socket.broadcast.emit('action', data)
        log(`Broadcasting request ID:${actionID} completed`)
      })

      socket.on('disconnect', function () {
        clients.unsubscribe(id)
      })
    })
  }
}

module.exports = registerCollaborativeService

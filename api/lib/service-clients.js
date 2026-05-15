const { randomGUID } = require('./util')

class ServiceClients {
  constructor(log){
    this.log = log
  }

  clients = []

  logClients = () => {
    const message = [
      `Total number of clients: ${this.clients.length}`,
      ...this.clients.map(({ id }) => `- ${id}`)
    ]
    this.log(message.join('\n'))
  }

  subscribe = (socket, data = {}) => {
    let id = randomGUID()
    const client = { id, socket, data }
    this.clients.push(client)
    this.log(`Client ID:${id} connected`)
    this.logClients()
    return id
  }

  update = (id, dataPatch) => {
    const client = this.clients.find(c => c.id === id)
    if (!client) {
      this.log(`Invalid client update request (client ID ${JSON.stringify(id)} doesn't exist)`)
    } else {
      Object.assign(client.data, dataPatch)
    }
  }

  notifyAllIf = (messageType, messageValue, ifCondition) => {
    this.clients.forEach((client) => {
      if (ifCondition(client)) {
        client.socket.emit(messageType, messageValue);
      }
    })
  }

  unsubscribe = (id) => {
    let idx = this.clients.findIndex(c => c.id === id)
    this.clients.splice(idx, 1)
    this.log(`Client ID:${id} disconnected`)
    this.logClients()
  }
}

module.exports = {
  ServiceClients,
}

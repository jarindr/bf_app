import _ from 'lodash'
class SocketConnector {
  constructor(url, params = {}) {
    if (!url) {
      throw new Error('socket URL is not provided.')
    }
    this.socket = null
    this.url = url
    this.reconnectInterval = 2000
    this.handleOnConnected = () => {}
    this.handleOnDisconnected = () => {}
    this.handleOnMessage = () => {}
    this.handleSubscribedMessage = () => {}
    this.handleUnsubscribedMessage = () => {}
    this.WebSocket = WebSocket
    this.connectionStateMap = {
      '0': 'CONNECTING',
      '1': 'CONNECTED',
      '2': 'DISCONNECTING',
      '3': 'DISCONNECTED'
    }
    this.queue = []
  }
  setParams(params) {
    this.params = Object.assign(this.params, params)
  }
  onConnect = resolve => () => {
    console.log('websocket connected.')
    this.handleOnConnected()
    this.drainQueue()
    return resolve(true)
  }
  onDisconnect = () => {
    this.handleOnDisconnected()
    this.socket.removeEventListener('open', this.onConnect)
    this.socket.removeEventListener('close', this.onDisconnect)
    this.socket.removeEventListener('message', this.handleMessage)
    console.log('websocket disconnected.')
    this.reconnect()
  }

  drainQueue = () => {
    this.queue.forEach(q => {
      this.socket.send(JSON.stringify(q))
    })
  }

  on(event, handler) {
    switch (event) {
      case 'connected':
        return (this.handleOnConnected = handler)
      case 'disconnected':
        return (this.handleOnDisconnected = handler)
      case 'message':
        return (this.handleOnMessage = handler)
    }
  }
  async reconnect() {
    setTimeout(async () => {
      console.log('reconnecting websocket...')
      console.log('pending queue', this.queue)
      await this.connect()
    }, this.reconnectInterval)
  }
  connect() {
    return new Promise((resolve, reject) => {
      this.socket = new this.WebSocket(this.url)
      this.socket.addEventListener('open', this.onConnect(resolve))
      this.socket.addEventListener('close', this.onDisconnect)
      this.socket.addEventListener('message', this.handleMessage)
    })
  }

  disconnect = () => {
    this.socket.close()
  }

  handleMessage = message => {
    const msg = JSON.parse(message.data)
    switch (msg.event) {
      case 'subscribed':
        console.log('Subscribed to:', msg)
        this.handleSubscribedMessage(msg)
        break
      case 'unsubscribed':
        this.queue = this.queue.filter(p => p.chanId !== msg.chanId)
        console.log('Unsubscribed :', msg)
        this.handleUnsubscribedMessage(msg)
        break
      case 'info':
        console.log('socket info', msg)
        break
      default:
        this.handleOnMessage(msg)
    }
  }
  getConnectionStatus() {
    return this.connectionStateMap[this.socket.readyState]
  }

  send = payload => {
    if (!_.some(this.queue, payload)) {
      console.log('Adding to queue', payload)
      this.queue.push(payload)
    }
    if (this.getConnectionStatus() === 'CONNECTED') {
      this.drainQueue()
    } else {
      try {
        if (!this.socket) {
          console.log(
            `attempt to join channel : ${payload} when socket is not initialized, added to queue.`
          )
        }
      } catch (error) {
        console.warn('something went wrong while joining channel with error', error)
      }
    }
  }
}
export default SocketConnector

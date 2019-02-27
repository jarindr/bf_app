import { render } from 'react-dom'
import App from './app'
import React from 'react'
import { configureStore } from './store'
import SocketConnector from './socket/connector'
import { handleWebsocketMessage } from './socket/handleMessage'

const socket = new SocketConnector('wss://api-pub.bitfinex.com/ws/2')

socket.connect()
socket.on('message', msg => handleWebsocketMessage(store)(msg))
const store = configureStore({}, { socket })

socket.handleSubscribedMessage = msg => {
  store.dispatch({ type: 'SOCKET_MESSAGE/SUBSCRIBED/RECEIVE', data: msg })
}

socket.handleunsubscribedMessage = msg => {
  store.dispatch({ type: 'SOCKET_MESSAGE/UNSUBSCRIBED/RECEIVE', data: msg })
}

window.disconnect = socket.disconnect

const SocketContext = React.createContext()

// RENDER APP
render(
  <SocketContext.Provider value={socket}>
    <App store={store} />
  </SocketContext.Provider>,
  document.getElementById('app')
)

// HOT RELOADING FOR DEVELOPMENT MODE
if (module.hot) {
  module.hot.accept('./app', () => {
    render(<App />, document.getElementById('app'))
  })
  module.hot.accept('./reducer', () => {
    store.replaceReducer(require('./reducer').default)
  })
}

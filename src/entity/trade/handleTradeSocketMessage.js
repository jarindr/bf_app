export const handleTradeSocketMessage = message => store => {
  const channelId = message[0]
  if (Array.isArray(message[1])) {
    return store.dispatch({
      type: 'SOCKET_MESSAGE/TRADE/RECEIVE_SNAPSHOT',
      data: message[1],
      channel: store.getState().channels[channelId]
    })
  }
  // CONFIRMED
  if (message[1] === 'tu') {
    return store.dispatch({
      type: 'SOCKET_MESSAGE/TRADE/RECEIVE_UPDATE',
      data: [message[2]],
      channel: store.getState().channels[channelId]
    })
  }
}

export const handleTickerSocketMessage = message => store => {
  const channelId = message[0]
  return store.dispatch({
    type: 'SOCKET_MESSAGE/TICKET/RECEIVE',
    data: message[1],
    channel: store.getState().channels[channelId]
  })
}
// CONFIRME

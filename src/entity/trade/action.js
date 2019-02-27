export const fetchTradeStream = symbol => (dispatch, getState, { socket }) => {
  socket.send({ event: 'subscribe', channel: 'trades', symbol })
  return dispatch({ type: 'TRADE/SUBSCRIBE' })
}

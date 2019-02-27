export const fetchTickerStream = symbol => (state, action, { socket }) => {
  socket.send({ event: 'subscribe', channel: 'ticker', symbol })
}

export const fetchBookStream = (symbol, precision) => (dispatch, getState, { socket }) => {
  const precisions = ['P0', 'P1', 'P2', 'P3', 'P4']
  socket.send({ event: 'subscribe', channel: 'book', symbol, prec: precision })
  return dispatch({ type: 'BOOK/SUBSCRIBE' })
}

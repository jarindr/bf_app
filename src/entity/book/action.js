export const fetchBookStream = (symbol, precision) => (dispatch, getState, { socket }) => {
  socket.send({ event: 'subscribe', channel: 'book', symbol, prec: precision })
  return dispatch({ type: 'BOOK/SUBSCRIBE' })
}

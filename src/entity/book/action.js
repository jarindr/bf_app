export const fetchBookStream = symbol => (dispatch, getState, { socket }) => {
  socket.send({ event: 'subscribe', channel: 'book', symbol })
  return dispatch({ type: 'BOOK/SUBSCRIBE' })
}

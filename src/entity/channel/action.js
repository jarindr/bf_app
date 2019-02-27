export const disconnect = () => (dispatch, getState, { socket }) => {
  socket.disconnect()
}

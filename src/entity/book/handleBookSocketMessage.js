import { isSnapshot } from './helper'
export const handleBookSocketMesssage = message => store => {
  const channelId = message[0]
  if (isSnapshot(message)) {
    if (Array.isArray(message[1][0])) {
      return store.dispatch({
        type: 'SOCKET_MESSAGE/BOOK/RECEIVE_SNAPSHOT',
        data: message[1],
        channel: store.getState().channels[channelId]
      })
    } else {
      return store.dispatch({
        type: 'SOCKET_MESSAGE/BOOK/RECEIVE_UPDATE',
        data: message[1],
        channel: store.getState().channels[channelId]
      })
    }
  }
  // CONFIRMED
}

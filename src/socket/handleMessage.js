import { handleBookSocketMesssage } from '../entity/book/handleBookSocketMessage'
export const handleWebsocketMessage = store => message => {
  const channel = store.getState().channels[message[0]]
  if (channel) {
    switch (channel.channel) {
      case 'book':
        return handleBookSocketMesssage(message)(store)
      default:
        break
    }
  }
}

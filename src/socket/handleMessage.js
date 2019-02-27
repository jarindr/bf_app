import { handleBookSocketMesssage } from '../entity/book/handleBookSocketMessage'
export const handleWebsocketMessage = store => (message, eventMap) => {
  const channel = eventMap[message[0]]['channel']
  switch (channel) {
    case 'book':
      return handleBookSocketMesssage(message)(store)
    default:
      break
  }
}

import { handleBookSocketMesssage } from '../entity/book/handleBookSocketMessage'
import { handleTradeSocketMessage } from '../entity/trade/handleTradeSocketMessage'
export const handleWebsocketMessage = store => message => {
  const channel = store.getState().channels[message[0]]
  if (channel) {
    switch (channel.channel) {
      case 'book':
        return handleBookSocketMesssage(message)(store)
      case 'trades':
        return handleTradeSocketMessage(message)(store)
      default:
        break
    }
  }
}

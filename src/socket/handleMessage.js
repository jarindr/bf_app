import { handleBookSocketMesssage } from '../entity/book/handleBookSocketMessage'
import { handleTradeSocketMessage } from '../entity/trade/handleTradeSocketMessage'
import { handleTickerSocketMessage } from '../entity/ticker/handleTickerSocketMessage'
export const handleWebsocketMessage = store => message => {
  const channel = store.getState().channels[message[0]]
  if (channel) {
    switch (channel.channel) {
      case 'book':
        return handleBookSocketMesssage(message)(store)
      case 'trades':
        return handleTradeSocketMessage(message)(store)
      case 'ticker':
        return handleTickerSocketMessage(message)(store)
      default:
        break
    }
  }
}

import { combineReducers } from 'redux'
import { bookReducer } from '../entity/book/reducer'
import { channelReducer } from '../entity/channel/reducer'
import { tradeReducer } from '../entity/trade/reducer'
import { tickerReducer } from '../entity/ticker/reducer'
import { socketReducer } from '../socket/reducer'
export default combineReducers({
  books: bookReducer,
  channels: channelReducer,
  trades: tradeReducer,
  tickers: tickerReducer,
  socketStatus: socketReducer
})

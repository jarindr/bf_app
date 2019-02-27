import { combineReducers } from 'redux'
import { bookReducer } from '../entity/book/reducer'
import { channelReducer } from '../entity/channel/reducer'
import { tradeReducer } from '../entity/trade/reducer'
export default combineReducers({
  books: bookReducer,
  channels: channelReducer,
  trades: tradeReducer
})

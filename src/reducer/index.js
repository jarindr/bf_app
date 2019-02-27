import { combineReducers } from 'redux'
import { bookReducer } from '../entity/book/reducer'
import { channelReducer } from '../entity/channel/reducer'

export default combineReducers({
  books: bookReducer,
  channels: channelReducer
})

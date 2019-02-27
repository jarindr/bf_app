import { combineReducers } from 'redux'
import { bookReducer } from '../entity/book/reducer'

export default combineReducers({
  books: bookReducer,
})

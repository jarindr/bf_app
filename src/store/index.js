import { applyMiddleware, createStore } from 'redux'
import reducer from '../reducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { enableBatching } from 'redux-batched-actions'
export function configureStore (initialState = {}, injectedThunk = {}) {
  return createStore(
    enableBatching(reducer),
    initialState,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(injectedThunk)))
  )
}

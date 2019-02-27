import createReducer from '../../reducer/createReducer'
import { serialize } from './serializer'
export const tickerReducer = createReducer(
  {},
  {
    'SOCKET_MESSAGE/TICKET/RECEIVE': (state, { data }) => {
      const payload = serialize(data)
      return { [payload.bid]: payload }
    }
  }
)

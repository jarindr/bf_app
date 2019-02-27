import createReducer from '../../reducer/createReducer'
import { serialize } from './serializer'
export const tickerReducer = createReducer(
  {},
  {
    'SOCKET_MESSAGE/TICKET/RECEIVE': (state, { data, channel }) => {
      const payload = serialize(data)
      return { [channel.symbol]: payload }
    }
  }
)

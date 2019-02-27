import createReducer from '../../reducer/createReducer'
import { serialize } from './helper'
import _ from 'lodash'

function handleTradeMessage (state, { data, channel }) {
  const transform = data.map(d => serialize(d))
  const tradesBySymbol = state[channel.symbol] || []
  return {
    [channel.symbol]: _([...tradesBySymbol, ...transform])
      .sortBy(d => -d.mts)
      .sortedUniqBy(d => d.id)
      .value()
      .slice(0, 25)
  }
}
export const tradeReducer = createReducer(
  {},
  {
    'SOCKET_MESSAGE/TRADE/RECEIVE_SNAPSHOT': handleTradeMessage,
    'SOCKET_MESSAGE/TRADE/RECEIVE_UPDATE': handleTradeMessage
  }
)

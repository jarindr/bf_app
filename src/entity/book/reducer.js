import createReducer from '../../reducer/createReducer'
import { serialize } from './serializer'
import _ from 'lodash'

function handleBookSnapshotMessage(state, { data, channel }) {
  const transform = data.map(d => serialize(d))
  return {
    [channel.symbol]: {
      bids: transform
        .filter(book => book.amount > 0)
        .reduce((prev, curr, index) => {
          prev[curr.price] = curr
          return prev
        }, {}),

      asks: transform
        .filter(book => book.amount < 0)
        .reduce((prev, curr, index) => {
          prev[curr.price] = curr
          return prev
        }, {})
    }
  }
}

function handleBooUpdateMessage(state, { data, channel }) {
  const transform = serialize(data)
  let newBids = { ...state[channel.symbol].bids }
  let newAsks = { ...state[channel.symbol].asks }
  if (transform.count > 0) {
    if (transform.amount > 0) {
      newBids[transform.price] = transform
    }
    if (transform.amount < 0) {
      newAsks[transform.price] = transform
    }
  }
  if (transform.count === 0) {
    if (transform.amount === 1) {
      delete newBids[transform.price]
    }
    if (transform.amount === -1) {
      delete newAsks[transform.price]
    }
  }
  return {
    [channel.symbol]: {
      bids: newBids,
      asks: newAsks
    }
  }
}
export const bookReducer = createReducer(
  {},
  {
    'SOCKET_MESSAGE/BOOK/RECEIVE_SNAPSHOT': handleBookSnapshotMessage,
    'SOCKET_MESSAGE/BOOK/RECEIVE_UPDATE': handleBooUpdateMessage
  }
)

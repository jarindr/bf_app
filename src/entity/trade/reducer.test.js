import { tradeReducer } from './reducer.js'

describe('tradeReducer', () => {
  test('[SOCKET_MESSAGE/TRADE/RECEIVE_SNAPSHOT] should return sorted array by mts desc', () => {
    expect(
      tradeReducer([[5, 4, 3, 2]], {
        type: 'SOCKET_MESSAGE/TRADE/RECEIVE_SNAPSHOT',
        data: [[1, 2, 3, 4], [6, 8, 9, 10]],
        channel: { chanId: 'chanId', symbol: 'BITCOIN' }
      })
    ).toEqual({
      BITCOIN: [{ amount: 9, id: 6, mts: 8, price: 10 }, { amount: 3, id: 1, mts: 2, price: 4 }]
    })
  })

  test('[SOCKET_MESSAGE/TRADE/RECEIVE_UPDATE] should return sorted array by mts desc', () => {
    expect(
      tradeReducer([], {
        type: 'SOCKET_MESSAGE/TRADE/RECEIVE_UPDATE',
        data: [[1, 2, 3, 4], [55, 66, 77, 88]],
        channel: { chanId: 'chanId', symbol: 'BITCOIN' }
      })
    ).toEqual({
      BITCOIN: [{ amount: 77, id: 55, mts: 66, price: 88 }, { amount: 3, id: 1, mts: 2, price: 4 }]
    })
  })

  test('[SOCKET_MESSAGE/TRADE/RECEIVE_UPDATE] should return sorted array by mts desc remove dup', () => {
    expect(
      tradeReducer([[1, 2, 3, 4], [55, 66, 77, 88]], {
        type: 'SOCKET_MESSAGE/TRADE/RECEIVE_UPDATE',
        data: [[1, 2, 3, 4], [55, 66, 77, 88]],
        channel: { chanId: 'chanId', symbol: 'BITCOIN' }
      })
    ).toEqual({
      BITCOIN: [{ amount: 77, id: 55, mts: 66, price: 88 }, { amount: 3, id: 1, mts: 2, price: 4 }]
    })
  })
})

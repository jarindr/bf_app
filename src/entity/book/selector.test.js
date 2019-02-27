import { selectAsksAndBids } from './selector'
describe('books', () => {
  test('[selectAsksAndBids] should select the state in store and return acc total correctly plus sorted', () => {
    const state = {
      books: {
        tBTCUSD: {
          bids: {
            3900: {
              price: 3900,
              count: 1,
              amount: 2
            },
            4100: {
              price: 4100,
              count: 1,
              amount: 2
            },
            4200: {
              price: 4200,
              count: 1,
              amount: 2
            }
          },
          asks: {
            4300: {
              price: 4300,
              count: 1,
              amount: -2
            },
            4400: {
              price: 4400,
              count: 1,
              amount: -2
            },
            4500: {
              price: 4500,
              count: 1,
              amount: -2
            }
          }
        }
      }
    }
    const selected = selectAsksAndBids(state)('tBTCUSD')
    expect(selected).toEqual({
      asks: [
        { amount: -2, count: 1, price: 4300, total: '-2.00' },
        { amount: -2, count: 1, price: 4400, total: '-4.00' },
        { amount: -2, count: 1, price: 4500, total: '-6.00' }
      ],
      bids: [
        { amount: 2, count: 1, price: 4200, total: '2.00' },
        { amount: 2, count: 1, price: 4100, total: '4.00' },
        { amount: 2, count: 1, price: 3900, total: '6.00' }
      ]
    })
  })
})

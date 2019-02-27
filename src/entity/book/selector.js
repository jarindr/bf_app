import _ from 'lodash'
export const selectAsksAndBids = state => symbol => {
  const bids = state.books[symbol] ? state.books[symbol].bids : {}
  const asks = state.books[symbol] ? state.books[symbol].asks : {}
  const sortedBids = _(bids)
    .keys()
    .map(d => state.books[symbol].bids[d])
    .sortBy(bid => -bid.price)
    .value()

  const sortedAsks = _(asks)
    .keys()
    .map(d => state.books[symbol].asks[d])
    .sortBy(ask => ask.price)
    .value()

  return {
    bids: sortedBids.map((bid, index) => ({
      ...bid,
      total: _.sumBy(sortedBids.slice(0, index + 1), d => d.amount).toFixed(2)
    })),
    asks: sortedAsks.map((ask, index) => ({
      ...ask,
      total: _.sumBy(sortedAsks.slice(0, index + 1), d => d.amount).toFixed(2)
    }))
  }
}

import _ from 'lodash'
export const selectAsksAndBids = state => (symbol, precision) => {
  const key = `${symbol}-${precision}`
  const bids = state.books[key] ? state.books[key].bids : {}
  const asks = state.books[key] ? state.books[key].asks : {}
  const sortedBids = _(bids)
    .keys()
    .map(d => state.books[key].bids[d])
    .sortBy(bid => -bid.price)
    .value()

  const sortedAsks = _(asks)
    .keys()
    .map(d => state.books[key].asks[d])
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

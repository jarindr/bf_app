export const selectTrades = state => symbol => {
  return _.values(state.trades[symbol])
}

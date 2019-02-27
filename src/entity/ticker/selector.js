export const selectTicker = state => symbol => {
  return state.tickers[symbol]
}

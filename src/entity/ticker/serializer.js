const TICKER_FIELDS = {
  0: 'bid',
  1: 'bid_size',
  2: 'ask',
  3: 'ask_size',
  4: 'daily_change',
  5: 'daily_change_perc',
  6: 'last_price',
  7: 'volume',
  8: 'high',
  9: 'low'
}

export const serialize = payload => {
  return payload.reduce((prev, curr, index) => {
    return { ...prev, [TICKER_FIELDS[index]]: curr }
  }, {})
}

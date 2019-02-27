export const TRADING_FIELDS = {
  0: 'id',
  1: 'mts',
  2: 'amount',
  3: 'price'
}

export const isSnapshot = payload => Array.isArray(payload[1])

export const isUpdate = payload => Array.isArray(payload[2])

export const serialize = payload => {
  return payload.reduce((prev, curr, index) => {
    return { ...prev, [TRADING_FIELDS[index]]: curr }
  }, {})
}

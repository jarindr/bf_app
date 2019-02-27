export const BOOKING_FIELDS = {
  0: 'price',
  1: 'count',
  2: 'amount'
}

export const serialize = payload => {
  return payload.reduce((prev, curr, index) => {
    return { ...prev, [BOOKING_FIELDS[index]]: curr }
  }, {})
}


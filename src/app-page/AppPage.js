import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookingWidget from '../bfx-booking-widget/BookingWidget'
import TradeWidget from '../bfx-trade-widget/TradeWidget'
import TickerWidget from '../bfx-ticker-widget/TickerWidget'
class AppPage extends Component {
  static propTypes = {
    fetchTradeStream: PropTypes.func,
    fetchBookStream: PropTypes.func,
    trades: PropTypes.array,
    books: PropTypes.object,
    match: PropTypes.object
  }
  state = { precision: 0 }

  render () {
    return (
      <div style={{display: 'flex'}}>
        <BookingWidget />
        <TradeWidget />
        <TickerWidget />
      </div>
    )
  }
}

export default AppPage

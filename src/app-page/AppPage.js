import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { fetchBookStream } from '../entity/book/action'
import { selectAsksAndBids } from '../entity/book/selector'
import moment from 'moment'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import BookingWidget from '../bfx-booking-widget/BookingWidget'
import TradeWidget from '../bfx-trade-widget/TradeWidget'
class AppPage extends Component {
  static propTypes = {
    fetchTradeStream: PropTypes.func,
    fetchBookStream: PropTypes.func,
    trades: PropTypes.array,
    books: PropTypes.object,
    match: PropTypes.object
  }
  state = { precision: 0 }

  render() {
    return (
      <div>
        <BookingWidget />
        <TradeWidget />
      </div>
    )
  }
}

export default AppPage

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { fetchBookStream, unsubscribe } from '../entity/book/action'
import { selectAsksAndBids } from '../entity/book/selector'
import moment from 'moment'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import BookingWidget from '../bookingWidget/bookingWidget'

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
      </div>
    )
  }
}

export default AppPage

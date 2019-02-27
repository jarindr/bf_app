import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookingWidget from '../bfx-booking-widget/BookingWidget'
import TradeWidget from '../bfx-trade-widget/TradeWidget'
import TickerWidget from '../bfx-ticker-widget/TickerWidget'
import { disconnect } from '../entity/channel/action'
import { connect } from 'react-redux'
import styled from 'styled-components'
const Button = styled.button`
  padding: 20px 30px;
  margin: 20px;
`
class AppPage extends Component {
  static propTypes = {
    disconnect: PropTypes.func,
    status: PropTypes.string
  }
  state = { precision: 0 }
  onClickDisconnect = e => {
    this.props.disconnect()
  }
  render () {
    return (
      <div>
        <TickerWidget />
        <div style={{ display: 'flex' }}>
          <BookingWidget />
          <TradeWidget />
        </div>
        <div>
          <Button onClick={this.onClickDisconnect}>DISCONECT WEBSOCKET</Button>
          {this.props.status}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({ status: state.socketStatus }),
  { disconnect }
)(AppPage)

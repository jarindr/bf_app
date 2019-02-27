import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { selectTrades } from '../entity/trade/selector'
import { withRouter } from 'react-router-dom'
import { fetchTradeStream } from '../entity/trade/action'
import moment from 'moment'

const enhance = compose(
  withRouter,
  connect(
    (state, props) => {
      return { trades: selectTrades(state)(props.match.params.symbol) }
    },
    { fetchTradeStream }
  )
)

class TradeWidget extends Component {
  static propTypes = {
    trades: PropTypes.array
  }
  componentDidMount = () => {
    this.props.fetchTradeStream(this.props.match.params.symbol)
  }

  render() {
    return (
      <div>
        {this.props.trades &&
          this.props.trades.map((x, i) => (
            <div key={i} style={{ backgroundColor: x.amount > 0 ? 'green' : 'red' }}>
              {moment(x.mts).format('hh:mm:ss')} {x.amount} {x.price}
            </div>
          ))}
      </div>
    )
  }
}

export default enhance(TradeWidget)

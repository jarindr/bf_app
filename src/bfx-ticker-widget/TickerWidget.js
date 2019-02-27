import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { selectTicker } from '../entity/ticker/selector'
import { withRouter } from 'react-router-dom'
import { fetchTickerStream } from '../entity/ticker/action'

const enhance = compose(
  withRouter,
  connect(
    (state, props) => {
      return { ticker: selectTicker(state)(props.match.params.symbol) }
    },
    { fetchTickerStream }
  )
)

class TradeWidget extends Component {
  static propTypes = {
    ticker: PropTypes.object,
    match: PropTypes.object,
    fetchTickerStream: PropTypes.func
  }

  componentDidMount = () => {
    this.props.fetchTickerStream(this.props.match.params.symbol)
  }

  render () {
    return <div>{this.props.ticker && _.values(this.props.ticker)}</div>
  }
}

export default enhance(TradeWidget)

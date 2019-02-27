import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { selectTicker } from '../entity/ticker/selector'
import { withRouter } from 'react-router-dom'
import { fetchTickerStream } from '../entity/ticker/action'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #1b262d;
  padding: 20px;
  margin: 10px;
  > div {
    flex: 1 1 auto;
  }
`

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
    return (
      <Container>
        {this.props.ticker && (
          <div>
            <div>{this.props.ticker.ask.toFixed(1)}</div>
            <div>LAST PRICE: {this.props.ticker.last_price.toFixed(1)}</div>
            <div>VOLUME: {(this.props.ticker.last_price * this.props.ticker.volume).toFixed(1)}</div>
            <div>LOW: {this.props.ticker.low.toFixed(1)}</div>
            <div>HIGH: {this.props.ticker.high.toFixed(1)}</div>
            <div>{this.props.ticker.daily_change.toFixed(2)}</div>
            <div>{(this.props.ticker.daily_change_perc * 100).toFixed(2)}</div>
          </div>
        )}
      </Container>
    )
  }
}

export default enhance(TradeWidget)

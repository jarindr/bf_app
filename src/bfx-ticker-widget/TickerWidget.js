import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { selectTicker } from '../entity/ticker/selector'
import { withRouter } from 'react-router-dom'
import { fetchTickerStream } from '../entity/ticker/action'
import styled from 'styled-components'
import { splitSymbol } from '../entity/symbol/symbolMapper'

const Container = styled.div`
  display: inline-block;
  background-color: #1b262d;
  padding: 20px;
  border-radius: 4px;
  margin: 10px;
  > div {
    flex: 1 1 auto;
  }
`

const RowContainer = styled.div`
  display: flex;
  > div:first-child {
    margin-right: 50px;
  }
  > div > div {
    margin: 5px;
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
    const ticker = splitSymbol(this.props.match.params.symbol)
    return (
      <Container>
        {this.props.ticker && (
          <RowContainer>
            <div>
              <div>{ticker}</div>
              <div>
                VOLUME: {(this.props.ticker.last_price * this.props.ticker.volume).toFixed(1)}{' '}
                {ticker.split('/')[1]}
              </div>
              <div>LOW: {this.props.ticker.low.toFixed(1)}</div>
            </div>
            <div>
              <div>LAST PRICE: {this.props.ticker.last_price.toFixed(1)}</div>
              <div>
                {this.props.ticker.daily_change.toFixed(2)} (
                {(this.props.ticker.daily_change_perc * 100).toFixed(2)}%)
              </div>

              <div>HIGH: {this.props.ticker.high.toFixed(1)}</div>
            </div>
          </RowContainer>
        )}
      </Container>
    )
  }
}

export default enhance(TradeWidget)

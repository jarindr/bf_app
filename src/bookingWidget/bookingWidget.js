import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { fetchBookStream, unsubscribe } from '../entity/book/action'
import { selectAsksAndBids } from '../entity/book/selector'
import moment from 'moment'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
const precisionMap = {
  0: 'P0',
  1: 'P1',
  2: 'P2',
  3: 'P3',
  4: 'P4'
}
const enhance = compose(
  withRouter,
  connect(
    (state, props) => ({
      selectBooks: selectAsksAndBids(state)
    }),
    { fetchBookStream, unsubscribe }
  )
)
const Container = styled.div`
  display: flex;
  > div {
    flex: 1 1 auto;
  }
`

const TradeRow = styled.div`
  position: relative;
  color: white;
  background: rgba(0, 0, 0, 0.6);
`
const BgLeft = styled.div.attrs({
  style: ({ percent }) => ({
    width: `${percent}%`
  })
})`
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 0, 0, 0.6);
`
const BgRight = styled.div.attrs({
  style: ({ percent }) => ({
    width: `${percent}%`
  })
})`
  position: absolute;
  z-index: -1;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 0, 0, 0.6);
`
class AppPage extends Component {
  static propTypes = {
    fetchTradeStream: PropTypes.func,
    fetchBookStream: PropTypes.func,
    trades: PropTypes.array,
    books: PropTypes.object,
    match: PropTypes.object
  }
  state = { precision: 0 }

  componentDidMount = () => {
    this.props.fetchBookStream(this.props.match.params.symbol, precisionMap[this.state.precision])
  }

  onClickAddPrecision = e => {
    if (this.state.precision + 1 <= 4) {
      this.setState({ precision: this.state.precision + 1 }, () => {
        this.props.fetchBookStream(
          this.props.match.params.symbol,
          precisionMap[this.state.precision]
        )
      })
    }
  }
  onClickRemovePrecision = e => {
    if (this.state.precision - 1 >= 0) {
      this.setState({ precision: this.state.precision - 1 }, () => {
        this.props.fetchBookStream(
          this.props.match.params.symbol,
          precisionMap[this.state.precision]
        )
      })
    }
  }
  render() {
    const books = this.props.selectBooks(
      this.props.match.params.symbol,
      precisionMap[this.state.precision] || {}
    )
    return (
      <Container>
        <button onClick={this.onClickAddPrecision}>+</button>
        <button onClick={this.onClickRemovePrecision}>-</button>
        <div style={{ display: 'flex' }}>
          <div>
            {books.bids &&
              books.bids.map(bid => {
                const max = books.bids[books.bids.length - 1].total
                const cur = bid.total
                return (
                  <TradeRow key={bid.price}>
                    <BgRight percent={(cur / max) * 100} />
                    {bid.count} {bid.total} {bid.price.toFixed(1)}
                  </TradeRow>
                )
              })}
          </div>
          <div style={{ padding: '0 5px' }} />
          <div>
            {books.asks &&
              books.asks.map(ask => {
                const max = books.asks[books.asks.length - 1].total
                const cur = ask.total
                return (
                  <TradeRow key={ask.price}>
                    <BgLeft percent={(cur / max) * 100} />
                    {ask.price.toFixed(1)} {Math.abs(ask.total)} {ask.count.toFixed(2)}
                  </TradeRow>
                )
              })}
          </div>
        </div>
      </Container>
    )
  }
}

export default enhance(AppPage)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { fetchBookStream } from '../entity/book/action'
import { selectAsksAndBids } from '../entity/book/selector'
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
    { fetchBookStream }
  )
)
const Container = styled.div`
  background-color: #1b262d;
  padding: 20px;
  margin: 10px;
  > div {
    flex: 1 1 auto;
  }
`

const TradeRow = styled.div`
  position: relative;
  color: white;
  padding: 2px;
  white-space: nowrap;
`
const BgLeft = styled.div.attrs({
  style: ({ percent }) => ({
    width: `${percent}%`
  })
})`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #83332f;
`
const BgRight = styled.div.attrs({
  style: ({ percent }) => ({
    width: `${percent}%`
  })
})`
  position: absolute;
  background-color: #77903e;
  opacity: 0.5;
  z-index: 1;
  right: 0;
  top: 0;
  bottom: 0;
`
const TradeItem = styled.div`
  width: 50px;
  display: inline-block;
  position: relative;
  z-index: 2;
`
class AppPage extends Component {
  static propTypes = {
    fetchTradeStream: PropTypes.func,
    fetchBookStream: PropTypes.func,
    trades: PropTypes.array,
    books: PropTypes.object,
    match: PropTypes.object,
    selectBooks: PropTypes.func
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
  getMaxTotal (books) {
    return Math.max(
      ...books.bids.map(x => Number(x.total)),
      ...books.asks.map(x => Math.abs(Number(x.total)))
    )
  }
  render () {
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
                const cur = bid.total
                return (
                  <TradeRow key={bid.price}>
                    <BgRight percent={(cur / this.getMaxTotal(books)) * 100} />
                    <TradeItem>{bid.count}</TradeItem>{' '}
                    <TradeItem>{bid.amount.toFixed(2)}</TradeItem>{' '}
                    <TradeItem>{bid.total}</TradeItem> <TradeItem>{bid.price}</TradeItem>
                  </TradeRow>
                )
              })}
          </div>
          <div style={{ padding: '0 1px' }} />
          <div>
            {books.asks &&
              books.asks.map(ask => {
                const cur = Math.abs(ask.total)
                return (
                  <TradeRow key={ask.price}>
                    <BgLeft percent={(cur / this.getMaxTotal(books)) * 100} />
                    <TradeItem>{ask.price}</TradeItem> <TradeItem>{Math.abs(ask.total)}</TradeItem>{' '}
                    <TradeItem>{Math.abs(ask.amount).toFixed(2)}</TradeItem>
                    <TradeItem>{ask.count}</TradeItem>
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

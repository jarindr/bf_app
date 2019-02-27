import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { selectTrades } from '../entity/trade/selector'
import { withRouter } from 'react-router-dom'
import { fetchTradeStream } from '../entity/trade/action'
import moment from 'moment'
import styled from 'styled-components'
import { precisionFixed } from '../entity/symbol/symbolMapper'
const TradeItem = styled.div`
  width: 50px;
  display: inline-block;
  position: relative;
  z-index: 2;
`

const Container = styled.div`
  padding: 10px 20px 20px 20px;
  background-color: #1b262d;
  margin: 10px;
  border-radius: 4px;
  width: 300px;
`
const RowItem = styled.div.attrs({
  style: ({ ask }) => ({
    backgroundColor: ask ? ' #83332f' : '#77903e'
  })
})`
  padding: 2px 7px;
  display: flex;
  justify-content: space-between;
`
const RowButton = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  > div:nth-child(2) {
    margin-left: auto;
  }
`
const RowHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

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
    trades: PropTypes.array,
    fetchTradeStream: PropTypes.func,
    match: PropTypes.object
  }
  componentDidMount = () => {
    this.props.fetchTradeStream(this.props.match.params.symbol)
  }

  render() {
    const precision = precisionFixed[this.props.match.params.symbol]
    return (
      <Container>
        <RowButton>Trades</RowButton>
        <RowHeader style={{ marginBottom: '5px' }}>
          <TradeItem>TIME</TradeItem>
          <TradeItem>AMOUNT</TradeItem>
          <TradeItem>PRICE</TradeItem>
        </RowHeader>
        {this.props.trades &&
          this.props.trades.map((x, i) => (
            <RowItem key={i} ask={x.amount > 0}>
              <TradeItem>{moment(x.mts).format('hh:mm:ss')}</TradeItem>{' '}
              <TradeItem>{Math.abs(x.amount).toFixed(2)}</TradeItem>{' '}
              <TradeItem>{precision ? x.price.toFixed(precision) : x.price}</TradeItem>
            </RowItem>
          ))}
      </Container>
    )
  }
}

export default enhance(TradeWidget)

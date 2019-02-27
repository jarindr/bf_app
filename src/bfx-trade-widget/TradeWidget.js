import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { selectTrades } from '../entity/trade/selector'
import { withRouter } from 'react-router-dom'
import { fetchTradeStream } from '../entity/trade/action'
import moment from 'moment'
import styled from 'styled-components'
const TradeItem = styled.div`
  width: 50px;
  display: inline-block;
  position: relative;
  z-index: 2;
`

const Container = styled.div`
  padding: 20px;
  background-color: #1b262d;
  margin: 10px;
`
const RowItem = styled.div.attrs({
  style: ({ ask }) => ({
    backgroundColor: ask ? ' #83332f' : '#77903e'
  })
})`
  padding: 2px;
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

  render () {
    return (
      <Container>
        {this.props.trades &&
          this.props.trades.map((x, i) => (
            <RowItem key={i} ask={x.amount > 0}>
              <TradeItem>{moment(x.mts).format('hh:mm:ss')}</TradeItem>{' '}
              <TradeItem>{Math.abs(x.amount).toFixed(2)}</TradeItem>{' '}
              <TradeItem>{x.price.toFixed(2)}</TradeItem>
            </RowItem>
          ))}
      </Container>
    )
  }
}

export default enhance(TradeWidget)

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'
import Routes from './routes/routes'
import { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'
import 'reset-css'

const theme = {}

class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }
  render () {
    return (
      <Provider store={this.props.store}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </Provider>
    )
  }
}

export default hot(module)(App)

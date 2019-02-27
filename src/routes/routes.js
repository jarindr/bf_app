import { BrowserRouter as Router, Switch, Redirect,Route } from 'react-router-dom'
import React from 'react'

const createRoute = () => (
  <Router>
    <Switch>
      <Redirect from='/' to='/t/tBTCUSD' exact />
      <Route path='/t/:symbol' render={() => <AppPage />} />
      <Route path='/t' render={() => <AppPage />} />
    </Switch>
  </Router>
)

export default createRoute

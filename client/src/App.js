import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import setUserToken from './utils/setUserToken'

import jwt_decode from 'jwt-decode'

import store from './store'
import { setLoggedUser, logoutUser } from './actions/userAuthActions'

//app main routing compoents
import Landing from './components/Landing'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Profile from './components/Profile/Profile'

if (localStorage.token) {
  setUserToken(localStorage.token)
  const decoded = jwt_decode(localStorage.token)

  // Set user and isAuthenticated
  store.dispatch(setLoggedUser(decoded))
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profile' component={Profile} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}
export default App
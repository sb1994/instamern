import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import setUserToken from './utils/setUserToken'

import jwt_decode from 'jwt-decode'

import store from './store'
import { setLoggedUser } from './actions/userAuthActions'

//app main routing compoents
import Landing from './components/Landing'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Profile from './components/Profile/Profile'
import EditProfile from './components/Profile/EditProfile'
import UserList from './components/Users/UsersList'
import UserProfile from './components/Users/UserProfile'

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
            <Route exact path='/profile/:id' component={UserProfile} />
            <Route exact path='/profile/edit' component={EditProfile} />
            <Route exact path='/recommended' component={UserList} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}
export default App

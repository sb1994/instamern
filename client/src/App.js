import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import setUserToken from "./utils/setUserToken";

import jwt_decode from "jwt-decode";

import store from "./store";
import { setLoggedUser } from "./actions/userAuthActions";

//app main routing compoents
import Landing from "./components/Landing";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import EditProfile from "./components/Profile/EditProfile";
import UserList from "./components/Users/UsersList";
import UsersFollowers from "./components/Users/UsersFollowers";
import UsersFollowing from "./components/Users/UsersFollowing";
import UserPosts from "./components/Posts/UserPosts";

//navigation
import Navigation from "./components/Nav/Navigation";

if (localStorage.token) {
  setUserToken(localStorage.token);
  const decoded = jwt_decode(localStorage.token);

  // Set user and isAuthenticated
  store.dispatch(setLoggedUser(decoded));
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile/:id/posts" component={UserPosts} />
            <Route
              exact
              path="/profile/:id/followers"
              component={UsersFollowers}
            />
            <Route
              exact
              path="/profile/:id/following"
              component={UsersFollowing}
            />
            <Route exact path="/user/edit" component={EditProfile} />
            <Route exact path="/recommended" component={UserList} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
export default App;

import React, { Component } from "react";
import { connect } from "react-redux";
import UserProfile from "../Users/UserProfile";
class UsersFollowers extends Component {
  render() {
    return (
      <div>
        <UserProfile id={this.props.match.params.id} />
        <hr />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(UsersFollowers);

import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentUser } from "../actions/userAuthActions";
class Landing extends Component {
  componentDidMount() {
    let { isAuthenticated, user } = this.props.auth;

    if (isAuthenticated) {
      // this.props.getCurrentUser(user.id)
      this.props.history.push(`/profile/${user._id}/posts`);
    }
  }
  componentDidUpdate() {}
  render() {
    return (
      <div className="container">
        <h1>Landing</h1>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(
  mapStateToProps,
  { getCurrentUser }
)(Landing);

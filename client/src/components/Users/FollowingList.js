import React, { Component } from "react";
import { connect } from "react-redux";
import UsersListItem from "./UsersListItem";
import { withRouter } from "react-router-dom";
class FollowingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      following: [],
      isLoading: false
    };
  }
  componentDidMount() {
    // console.log(this.props.following)
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.auth.searchedUser)
    // console.log(nextProps.following)
    let { searchedUser } = nextProps.auth;

    if (nextProps.auth.searchedUser.following === undefined) {
      this.setState({ isLoading: true });
    } else {
      this.setState({
        isLoading: false,
        following: searchedUser.following
      });
    }
  }
  render() {
    let { searchedUser } = this.props.auth;
    // let { isLoading } = this.state
    let { isLoading, following } = this.state;
    //checking if the searchedUser
    if (isLoading || searchedUser === null) {
      return (
        <div>
          <p>isLoading</p>
        </div>
      );
    } else if (following.length < 0) {
      return (
        <div>
          <p>you have no following you :( </p>
        </div>
      );
    } else {
      let renderFolloweringList = following.map(user => {
        return <UsersListItem user={user.user} key={user._id} />;
      });
      return <div>{renderFolloweringList}</div>;
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FollowingList)
);

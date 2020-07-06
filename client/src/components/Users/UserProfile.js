import React, { Component } from "react";
import _ from "lodash";

import { connect } from "react-redux";
import {
  getSearchedUser,
  getCurrentUser,
  addFollow
} from "../../actions/userAuthActions";
import SocialPanel from "./SocialPanel";
import { Link } from "react-router-dom";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      following: [],
      followers: [],
      isLoading: false,
      searchedUser: {}
    };
  }
  componentDidMount() {
    let { match, auth } = this.props;
    if (!auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.setState({
      isLoading: true
    });
    //gets all the asociated data for the current logged in user
    this.props.getCurrentUser(auth.user._id);

    //getst the data for the selected user
    this.props.getSearchedUser(match.params.id);

    this.setState({
      isLoading: false
    });
    // console.log(this.props.searchedUser);
  }
  componentWillUpdate(prevProps, prevState) {
    console.log(prevProps.auth);

    // if (this.props.auth.searchedUser._id === prevProps.auth.searchedUser._id) {
    //   console.log(this.props.auth)
    //   // this.setState({
    //   //   followers: this.props.auth.searchedUser.followers,
    //   // })
    // }
  }
  showEditPage = () => {
    this.props.history.push("/user/edit");
  };
  showRecommmendedUsers = () => {
    this.props.history.push("/user/edit");
  };
  handleAddFollow = () => {
    this.props.addFollow(this.props.auth.searchedUser._id);
  };

  getFollowersLength = () => {};
  render() {
    let { searchedUser, user } = this.props.auth;
    let { isLoading } = this.state;
    let { followers, following } = searchedUser;

    let alreadyFollowing = false;
    let sortedFollowers = [];
    let sortedFollowings = [];

    _.forEach(followers, follower => {
      if (follower.user._id === user._id) {
        alreadyFollowing = true;
      }
      sortedFollowers.push(follower.user._id);
    });

    _.forEach(following, followingee => {
      sortedFollowings.push(followingee.user._id);
    });

    // console.log(alreadyFollowing);

    if (isLoading || searchedUser === null) {
      return <div>Loading</div>;
    } else {
      // console.log(JSON.parse(JSON.stringify(searchedUser.followers)).length)
      // console.log(searchedUser.followers.user[0].length)
      // searchedUser.followers.filter((follower) => {
      //   return follower._id
      // })
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-4">
                  <img
                    height={100}
                    src={searchedUser.profile_pic}
                    alt="Profile Picture"
                    className="rounded float-left"
                  />
                  {/* <button onClick={this.handleAddFollow}>Follow</button> */}
                  {alreadyFollowing === false &&
                  searchedUser._id !== user._id ? (
                    <button onClick={this.handleAddFollow}>Follow</button>
                  ) : (
                    ""
                  )}
                  {!alreadyFollowing || searchedUser._id !== user._id ? (
                    <button onClick={this.handleAddFollow}>Unfollow</button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-8">
                  <div className="row">
                    <div className="col-12">
                      <h4>{searchedUser.name}</h4>
                      {searchedUser._id === user._id ? (
                        <button onClick={this.showEditPage}>
                          Edit Profile
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    <SocialPanel
                      followers={sortedFollowers}
                      following={sortedFollowings}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  {
    getSearchedUser,
    getCurrentUser,
    addFollow
  }
)(UserProfile);

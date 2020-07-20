import React, { Component, Fragment } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import {
  getSearchedUser,
  getCurrentUser,
  addFollow,
  removeFollow
} from "../../actions/userAuthActions";
import { getSelectedFeedPosts } from "../../actions/postActions";
//page compoents
import PostList from "../Posts/PostList";
import PostForm from "../Posts/PostForm";
import FollowingList from "../Users/FollowingList";
import FollowersList from "./FollowersList";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      following: [],
      followers: [],
      isLoading: false,
      searchedUser: {},
      msg: "",
      show: true,
      action: ""
    };
  }
  componentDidMount() {
    console.log(this.props.id);
    this.props.getSearchedUser(this.props.id);
  }
  render() {
    let { searchedUser } = this.props.auth;
    let { posts } = this.props.post;

    if (searchedUser !== undefined) {
      return (
        <div className="container">
          <h1>{searchedUser.name}</h1>
          <img style={{ height: 200 }} src={searchedUser.profile_pic} />
          {searchedUser.followers !== undefined ? (
            <Link to={`/profile/${searchedUser._id}/followers`}>
              {searchedUser.followers.length} Followers
            </Link>
          ) : (
            ""
          )}
          {searchedUser.following !== undefined ? (
            <Link to={`/profile/${searchedUser._id}/following`}>
              {searchedUser.following.length} Following
            </Link>
          ) : (
            ""
          )}
          {posts !== undefined ? (
            <Link to={`/profile/${searchedUser._id}/posts`}>
              {posts.length} Posts
            </Link>
          ) : (
            ""
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  {
    getSearchedUser,
    getCurrentUser,
    addFollow,
    removeFollow,
    getSelectedFeedPosts
  }
)(UserProfile);

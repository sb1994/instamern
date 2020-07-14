import React, { Component } from "react";
import { connect } from "react-redux";
import { getSelectedFeedPosts } from "../../actions/postActions";
import PostListItem from "./PostListItem";

class PostList extends Component {
  componentDidMount() {
    let { searchedUser } = this.props.auth;
    console.log(this.props);

    // console.log(searchedUser)
  }
  // componentDidUpdate(prevProps) {
  //   // console.log(prevProps);
  //   this.props.getSelectedFeedPosts(prevProps.feed_id);
  // }
  render() {
    if (this.props.posts === null) {
      return (
        <div>
          <h1>No Posts</h1>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Post List</h1>
          <PostListItem />
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
  { getSelectedFeedPosts }
)(PostList);

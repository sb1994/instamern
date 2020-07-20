import React, { Component } from "react";
import { connect } from "react-redux";
import UserProfile from "../Users/UserProfile";
import PostList from "../Posts/PostList";
import { getSelectedFeedPosts } from "../../actions/postActions";

class UserPosts extends Component {
  componentDidMount() {
    this.props.getSelectedFeedPosts(this.props.match.params.id);
  }
  render() {
    return (
      <div>
        <UserProfile id={this.props.match.params.id} />
        <hr />

        {this.props.post.posts === undefined ? (
          <p>No Posts</p>
        ) : (
          <PostList posts={this.props.post.posts} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  { getSelectedFeedPosts }
)(UserPosts);

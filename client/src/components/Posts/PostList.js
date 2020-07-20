import React, { Component } from "react";
import { connect } from "react-redux";
import { getSelectedFeedPosts } from "../../actions/postActions";
import PostListItem from "./PostListItem";
import { withRouter } from "react-router-dom";

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }
  render() {
    // console.log(this.props.posts);
    let { posts } = this.props;

    console.log(posts);

    let renderPosts = this.props.posts.map(post => {
      console.log(post);
      return <PostListItem key={post._id} post={post} />;
    });
    return (
      <div>
        <h1>Post List</h1>
        {renderPosts}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    { getSelectedFeedPosts }
  )(PostList)
);

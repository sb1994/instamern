import React, { Component } from "react";
import { connect } from "react-redux";
import { getSelectedFeedPosts, deletePosts } from "../../actions/postActions";
import PostListItem from "./PostListItem";
import { withRouter } from "react-router-dom";

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  handlePostDelete = () => {
    this.props.deletePosts();
  };
  render() {
    // console.log(this.props.posts);
    let { posts } = this.props;

    if (posts === undefined) {
      return <div>isLoading</div>;
    } else if (posts.length <= 0) {
      return (
        <div className="row">
          <div className="col-md-12">No Posts</div>
        </div>
      );
    } else {
      let renderPosts = this.props.posts.map(post => {
        return <PostListItem key={post._id} post={post} />;
      });
      return (
        <div className="row">
          <div className="col-md-12">
            <button className="btn btn-primary" onClick={this.handlePostDelete}>
              Delete All
            </button>
          </div>
          {renderPosts}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default withRouter(
  connect(
    mapStateToProps,
    { getSelectedFeedPosts, deletePosts }
  )(PostList)
);

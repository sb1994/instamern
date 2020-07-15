<<<<<<< HEAD
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostListItem from './PostListItem'
import { getSelectedFeedPosts } from '../../actions/postActions'
import { withRouter } from 'react-router-dom'
class PostList extends Component {
  componentDidMount() {
    let { searchedUser } = this.props.auth
    this.props.getSelectedFeedPosts(searchedUser._id)
    // console.log(searchedUser)
  }

  render() {
    let { posts } = this.props.post

    if (posts === null) {
      return <div>No Posts</div>
    } else {
      // console.log(posts)
=======
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
>>>>>>> 1654a56b7561ffd23e19216a2c116a91092a88aa
      return (
        <div>
          <h1>Post List</h1>
          <PostListItem />
        </div>
<<<<<<< HEAD
      )
=======
      );
>>>>>>> 1654a56b7561ffd23e19216a2c116a91092a88aa
    }
  }
}

<<<<<<< HEAD
const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
})
=======
const mapStateToProps = state => ({
  auth: state.auth
});
>>>>>>> 1654a56b7561ffd23e19216a2c116a91092a88aa

const mapDispatchToProps = {};

<<<<<<< HEAD
export default withRouter(
  connect(mapStateToProps, { getSelectedFeedPosts })(PostList)
)
=======
export default connect(
  mapStateToProps,
  { getSelectedFeedPosts }
)(PostList);
>>>>>>> 1654a56b7561ffd23e19216a2c116a91092a88aa

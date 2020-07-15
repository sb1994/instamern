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
      return (
        <div>
          <h1>Post List</h1>
          <PostListItem />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
})

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, { getSelectedFeedPosts })(PostList)
)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSelectedFeedPosts } from '../../actions/postActions'
import PostListItem from './PostListItem'
import { withRouter } from 'react-router-dom'

class PostList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps.feed_id)
    // console.log(this.props)

    // console.log(this.props.auth.searchedUser._id)
    if (prevProps.feed_id === this.props.feed_id) {
      console.log(prevProps, this.props.feed_id)
      // this.props.getSelectedFeedPosts(this.props.feed_id)
    } else {
      console.log('pog ')
      console.log(prevProps.feed_id)
      // this.props.getSelectedFeedPosts(prevProps.feed_id)
    }
    // console.log(this.props.searchedUser)
    // console.log(this.props.post.posts)
  }
  render() {
    let renderPosts = this.props.post.posts.map((post) => {
      return <PostListItem key={post._id} post={post} />
    })
    if (this.props.post.posts === undefined) {
      return (
        <div>
          <h1>No Posts</h1>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Post List</h1>
          {renderPosts}
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

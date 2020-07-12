import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostListItem from './PostListItem'

class PostList extends Component {
  render() {
    return (
      <div>
        <h1>Post List</h1>
        <PostListItem />
        <p>{this.props.feed_id}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostListItem from './PostListItem'

class PostList extends Component {
  componentDidMount() {
    let { searchedUser } = this.props.auth
    // console.log(searchedUser)
  }
  render() {
    return (
      <div>
        <h1>Post List</h1>
        <PostListItem />
        <p>{this.props.auth.searchedUser._id}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)

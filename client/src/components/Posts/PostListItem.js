import React, { Component } from 'react'
import { connect } from 'react-redux'

class PostListItem extends Component {
  render() {
    let { post } = this.props
    return (
      <div>
        <h2>{post.user.name}</h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PostListItem)

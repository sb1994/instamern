import React, { Component } from 'react'
import { connect } from 'react-redux'

class PostListItem extends Component {
  render() {
    return (
      <div>
        <h2>PostListItem</h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PostListItem)

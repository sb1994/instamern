import React, { Component } from 'react'
import { connect } from 'react-redux'

class CommentForm extends Component {
  render() {
    return (
      <div>
        <p>CommentForm</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)

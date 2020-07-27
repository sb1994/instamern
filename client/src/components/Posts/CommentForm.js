import React, { Component } from 'react'
import { connect } from 'react-redux'

class CommentForm extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  handleCommentSubmit = () => {
    console.log(this.props.post_id)
  }

  render() {
    return (
      <div className='col-12'>
        <h1>CommentForm</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)

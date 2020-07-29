import React, { Component } from 'react'
import { connect } from 'react-redux'

class CommentForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comment: '',
    }
  }
  handleCommentSubmit = () => {
    console.log(this.props.post_id)
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <div className='col-12'>
        <h1>CommentForm</h1>
        <input
          type='text'
          onChange={this.handleInputChange}
          name='comment'
          value={this.state.comment}
        />
        <p>{this.state.comment}</p>
        <button className='btn btn-primary' onClick={this.handleCommentSubmit}>
          Add Comment
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)

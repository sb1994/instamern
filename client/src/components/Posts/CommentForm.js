import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createComment } from '../../actions/postActions'
class CommentForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comment: '',
    }
  }
  handleCommentSubmit = () => {
    let newComment = {
      post: this.props.post_id,
      comment: this.state.comment,
    }
    this.props.createComment(newComment)
    this.setState({
      comment: '',
    })
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <div className='col-12'>
        <textarea
          className='form-control'
          rows='3'
          name='comment'
          onChange={this.handleInputChange}
          value={this.state.comment}
        />
        <button
          className='btn btn-primary'
          onClick={this.handleCommentSubmit}
          disabled={this.state.comment === ''}
        >
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

export default connect(mapStateToProps, { createComment })(CommentForm)

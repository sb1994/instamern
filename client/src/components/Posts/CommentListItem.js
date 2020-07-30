import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'

class CommentListItem extends Component {
  render() {
    let { comment } = this.props
    return (
      <div className='card mb-3'>
        <div className='row'>
          <div className='col-12'>
            <img
              src={comment.user.profile_pic}
              className='img-fluid rounded-circle float-left'
              style={{ height: 50 }}
            />
            <p className='font-weight-bold'>
              {comment.user.name}{' '}
              <span className='font-weight-light'>says:</span>
            </p>
          </div>
          <div className='col-8'></div>
          <div className='col-12 col-md-10'>
            <p>{comment.comment}</p>
            <Moment fromNow>{comment.created}</Moment>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListItem)

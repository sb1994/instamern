import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import './style.css'
class PostListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: true,
    }
  }
  handleShow = () => {
    this.setState({
      show: !this.state.show,
    })
  }
  handleClose = () => {
    this.setState({
      show: false,
    })
  }
  render() {
    let { post, auth } = this.props
    return (
      <Fragment>
        <div className='col-md-4 col-6 col-lg-3 mb-1' onClick={this.handleShow}>
          <img src={post.post_pic} className='img-fluid' />
        </div>

        {this.state.show ? (
          <Modal
            dialogClassName='modal-size'
            show={this.state.show}
            onHide={this.handleClose}
            // style={{ height: "" }}
          >
            <Modal.Body>
              <div className='row'>
                <div className='col-12 col-md-6'>
                  <img
                    src={post.post_pic}
                    className='img-fluid'
                    style={{ height: '500px' }}
                  />
                  <p>{post.caption}</p>
                </div>
                <div className='col-12 col-md-6'>
                  <div className='row'>
                    <CommentForm post_id={post._id} />
                    <CommentList comments={post.comments} />
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        ) : null}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PostListItem)

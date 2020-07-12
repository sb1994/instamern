import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

class PostFormModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
      post_pic: null,
      postImgURL: '',
      location: null,
    }
  }

  componentDidMount() {
    this.setState({
      show: this.props.show,
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show,
    })
  }

  handleModalClose = () => {
    this.setState({
      show: false,
    })
  }
  handleFileChange(e) {
    let { files } = e.target
    if (files.length > 0) {
      console.log(files)
      console.log(URL.createObjectURL(files[0]))
      this.setState({
        postImgURL: URL.createObjectURL(files[0]),
      })

      // const post_pic = e.target.files[0]
      // this.setState({
      //   post_pic,
      //   postImgURL: URL.createObjectURL(post_pic),
      // })
    }
    // console.log(e.target.files)
  }
  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    let { auth } = this.props
    let { show, postImgURL, post_text, post_pic } = this.state
    return (
      <Fragment>
        <Modal show={show} keyboard={false} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='col-12'>
                <div className='form-group'>
                  <input
                    type='text'
                    value={post_text}
                    name='post_text'
                    onChange={this.handleInputChange}
                    className='form-control'
                    placeholder='Post Text'
                  />
                </div>
                <div className='form-group'>
                  {/* <img src={this.state.postImgURL} /> */}
                  <input
                    type='file'
                    name='post_pic'
                    id='post_pic'
                    value={post_pic}
                    onChange={this.handleFileChange}
                  />
                </div>
              </div>
            </div>
            <button onClick={this.handleModalClose}>Close</button>
          </Modal.Body>
        </Modal>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PostFormModal)

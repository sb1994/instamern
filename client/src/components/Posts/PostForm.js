import React, { Component } from 'react'
import { connect } from 'react-redux'

class PostForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
      post_img: null,
      postImgURL: '',
      longitude: '',
      latitude: '',
      feed_id: '',
    }
  }

  handlePostCreate = () => {
    console.log(this.props.auth.searchedUser)
    console.log(this.state)

    let { text, post_img } = this.state
    let { searchedUser, user } = this.props.auth
    let { feed_id } = this.props

    // let createPostData = {
    //   text: this.state.text,
    //   location: {}
    // };
  }
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleFileChange = (e) => {
    let { text, post_img } = this.state
    let { searchedUser, user } = this.props.auth
    let { feed_id } = this.props
    if (e.target.files[0]) {
      const post_pic = e.target.files[0]
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let { latitude, longitude } = position.coords
          this.setState({
            latitude: latitude,
            longitude: longitude,
            feed_id: feed_id,
            text,
          })
        },
        (error) => {
          this.props.displayError('Error dectecting your location')
          console.error(JSON.stringify(error))
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      )
      this.setState({
        post_pic,
        postImgURL: URL.createObjectURL(post_pic),
      })
    }
  }
  render() {
    // console.log(this.state)
    let { postImgURL } = this.state

    return (
      <div>
        <h1>POst Form</h1>
        <img src={postImgURL} className='img-responsive card-img' alt='' />
        <input
          type='text'
          name='text'
          value={this.state.text}
          placeholder='Post text'
          onChange={this.handleInputChange}
        />
        <input
          type='file'
          // className='btn btn-green'
          value={this.state.profile_pic}
          name='post_pic'
          id='post_pic'
          onChange={this.handleFileChange}
        />
        <button className='btn btn-primary' onClick={this.handlePostCreate}>
          Handle Post Create
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)

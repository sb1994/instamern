import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../../actions/postActions'
import { storage } from '../../firebase'

class PostForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      caption: '',
      post_pic: null,
      postImgURL: '',
      longitude: '',
      latitude: '',
      feed_id: '',
    }
  }
  handlePostCreate = () => {
    let { caption, post_pic, longitude, latitude } = this.state
    let { searchedUser, user } = this.props.auth
    let { feed_id } = this.props
    const newPost = {
      caption,
      post_pic,
      feed_id,
      longitude,
      latitude,
    }
    console.log(newPost)
    if (newPost.caption === '' && newPost.post_pic === null) {
      console.log('please use at least one input')
    } else if (newPost.caption !== '' && newPost.post_pic === null) {
      console.log('please add image')
      // this.props.createPost(newPost)
    } else {
    }
  }
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleFileChange = (e) => {
    let { caption, post_pic } = this.state
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
            caption,
            post_pic,
            postImgURL: URL.createObjectURL(post_pic),
          })
        },
        (error) => {
          this.props.displayError('Error dectecting your location')
          console.error(JSON.stringify(error))
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      )
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
          name='caption'
          value={this.state.caption}
          placeholder='Post caption'
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

export default connect(mapStateToProps, { createPost })(PostForm)

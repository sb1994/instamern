import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSelectedFeedPosts } from '../../actions/postActions'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { FaBeer, FaLocationArrow } from 'react-icons/fa'
// import e from 'express'

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiYWxpZzEyMyIsImEiOiJja2RscGVtcGwxMGs5MzNzOG52bWlwaWJ6In0.aE-scdy4yzBvt17Pm2tTdg' // Set your mapbox token here

export class PostMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedPost: null,
      posts: [],
      // viewpoint: {
      //   // width: '',
      //   // height: '',
      //   // latitude: '',
      //   // longitude: '',
      //   // zoom: '',
      // },
      viewpoint: {
        // width: 400,
        // height: 400,
        // latitude: '',
        // longitude: '',
        // zoom: 8,
      },
    }
  }

  componentDidMount() {
    this.props.getSelectedFeedPosts(this.props.match.params.id)
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position)
      this.setState({
        viewpoint: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          width: '100%',
          height: '100vh',
          zoom: 8,
        },
      })
    })
  }
  handleViewMapChange = (viewpoint) => {
    this.setState({
      viewpoint,
    })
  }
  handleSetSelectedPost = (post) => {
    this.setState({
      selectedPost: post,
    })
  }
  handleShowPostHover = (post) => {
    console.log(post)
  }
  render() {
    let { posts } = this.props.post
    let { viewpoint, selectedPost } = this.state

    if (posts === undefined || posts.length === 0) {
      return (
        <div className='container'>
          <p>posts dont exist</p>
        </div>
      )
    } else {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <ReactMapGL
                {...viewpoint}
                width='100%'
                height='100vh'
                onViewportChange={(viewpoint) => {
                  this.handleViewMapChange(viewpoint)
                }}
                mapboxApiAccessToken={MAPBOX_TOKEN}
              >
                {posts.map((post, i) => (
                  <Marker
                    key={i}
                    latitude={parseFloat(post.latitude)}
                    longitude={parseFloat(post.longitude)}
                  >
                    <div>Post</div>
                    <button
                      style={{
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => {
                        e.preventDefault()
                        this.handleSetSelectedPost(post)
                      }}
                    >
                      <FaLocationArrow />
                    </button>
                  </Marker>
                ))}
                {selectedPost ? (
                  <Popup
                    latitude={parseFloat(selectedPost.latitude)}
                    longitude={parseFloat(selectedPost.longitude)}
                    // onClose={this.handleSetSelectedPost(null)}
                  >
                    <div className='col-12'>
                      <h4>{selectedPost.caption}</h4>
                    </div>
                  </Popup>
                ) : null}
              </ReactMapGL>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, { getSelectedFeedPosts })(PostMap)

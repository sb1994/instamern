import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import {
  getSearchedUser,
  getCurrentUser,
  addFollow,
  removeFollow,
} from '../../actions/userAuthActions'
//page compoents
import PostList from '../Posts/PostList'
import PostForm from '../Posts/PostForm'
import FollowingList from '../Users/FollowingList'
import FollowersList from './FollowersList'

class UserProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      following: [],
      followers: [],
      isLoading: false,
      searchedUser: {},
      msg: '',
      show: true,
      action: '',
    }
  }
  componentDidMount() {
    let { match, auth } = this.props

    if (!auth.isAuthenticated) {
      this.props.history.push('/login')
    }

    this.setState({
      isLoading: true,
      action: match.params.action,
    })
    // //gets all the asociated data for the current logged in user
    // this.props.getCurrentUser(auth.user._id)

    if (match.params.id === auth.user._id) {
      console.log('loading searched user from initial load')
      this.props.getSearchedUser(auth.user._id)
    } else {
      // console.log(match.params)
      this.props.getSearchedUser(match.params.id)
    }

    this.setState({
      isLoading: false,
    })
    // console.log(this.props.searchedUser);
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps.auth)
    let { action, id } = prevProps.match.params
    if (prevState.action !== this.props.match.params.action) {
      let { params } = this.props.match
      this.props.getSearchedUser(params.id)
      console.log(params.action)
      this.setState({
        action: params.action,
      })
    }
    // console.log(this.props.auth.searchedUser)
    // this.setState({
    //   followers: prevProps.props.searchedUser.followers,
    // })
    //   if (!prevProps.auth.isAuthenticated) {
    //     this.props.history.push('/login')
    //   }
    //   if (prevProps.auth.searchedUser.) {

    //   } else {
    //     // console.log(prevProps.match.params)

    //     console.log(action)
    //     // this.props.getSearchedUser(id)

    //     // this.setState({
    //     //   action: action,
    //     // })
    //   }
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.auth.isAuthenticated)
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push('/login')
    } else {
      // console.log(this.props.auth.searchedUser)

      let { followers, following } = this.props.auth.searchedUser

      console.log(following)
      let { action, id } = nextProps.match.params
      // // this.props.getSearchedUser(id)

      this.setState({
        followers,
        action: action,
      })
    }
  }
  showEditPage = () => {
    this.props.history.push('/user/edit')
  }
  handleAddFollow = () => {
    this.props.addFollow(this.props.auth.searchedUser._id)
  }
  handleRemoveFollow = () => {
    this.props.removeFollow(this.props.auth.searchedUser._id)
  }

  render() {
    let { searchedUser, user } = this.props.auth
    let { isLoading, show, action } = this.state
    let { followers, following } = searchedUser

    let alreadyFollowing = false
    let sortedFollowers = []
    let sortedFollowings = []

    _.forEach(followers, (follower) => {
      if (follower.user._id === user._id) {
        alreadyFollowing = true
      } else {
        alreadyFollowing = false
      }
      sortedFollowers.push(follower.user._id)
    })

    _.forEach(following, (followingee) => {
      sortedFollowings.push(followingee.user._id)
    })

    if (isLoading || searchedUser === null) {
      return <div>Loading</div>
    } else {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='row'>
                <div className='col-4'>
                  <img
                    height={100}
                    src={searchedUser.profile_pic}
                    className='rounded float-left'
                  />
                  {!alreadyFollowing && searchedUser._id !== user._id ? (
                    <button onClick={this.handleAddFollow}>Follow</button>
                  ) : (
                    ''
                  )}
                  {alreadyFollowing && searchedUser._id !== user._id ? (
                    <button onClick={this.handleRemoveFollow}>UnFollow</button>
                  ) : (
                    ''
                  )}
                </div>
                <div className='col-8'>
                  <div className='row'>
                    <div className='col-12'>
                      <h4>{searchedUser.name}</h4>
                      {searchedUser._id === user._id ? (
                        <button onClick={this.showEditPage}>
                          Edit Profile
                        </button>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className='col-12'>
                      <div className='row'>
                        <div className='col-md-4 col-12'>
                          1{' '}
                          <Link to={`/profile/${searchedUser._id}/posts`}>
                            Posts
                          </Link>
                        </div>
                        <div className='col-md-4 col-12'>
                          {sortedFollowers.length}
                          <Link to={`/profile/${searchedUser._id}/followers`}>
                            Followers
                          </Link>
                        </div>
                        <div className='col-md-4 col-12'>
                          {sortedFollowings.length}
                          <Link to={`/profile/${searchedUser._id}/following`}>
                            Following
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className='row'>
            <div className='col-12'>
              {/* <button
                className='btn btn-primary'
                onClick={this.showPostCreateModal}
                
              >
                Show Form
              </button> */}
              {action === 'posts' ? (
                <Fragment>
                  <PostForm feed_id={searchedUser._id} />
                  <PostList />
                </Fragment>
              ) : (
                ''
              )}
              {action === 'followers' ? (
                <FollowersList followers={searchedUser.followers} />
              ) : (
                ''
              )}
              {action === 'following' ? (
                <FollowingList following={searchedUser.following} />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {
  getSearchedUser,
  getCurrentUser,
  addFollow,
  removeFollow,
})(UserProfile)

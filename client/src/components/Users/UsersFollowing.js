import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserProfile from '../Users/UserProfile'
import FollowingList from '../Users/FollowingList'

export class UsersFollowing extends Component {
  render() {
    return (
      <div className='container'>
        <UserProfile id={this.props.match.params.id} />
        <hr />
        <FollowingList following={this.props.auth.searchedUser.following} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UsersFollowing)

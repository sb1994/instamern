import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserProfile from '../Users/UserProfile'
import FollowersList from './FollowersList'

class UsersFollowers extends Component {
  render() {
    return (
      <div>
        <UserProfile id={this.props.match.params.id} />
        <hr />
        <FollowersList followers={this.props.auth.searchedUser.followers} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(UsersFollowers)

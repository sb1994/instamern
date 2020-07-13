import React, { Component } from 'react'
import { connect } from 'react-redux'
import UsersListItem from './UsersListItem'

class FollowersList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      followers: [],
      isLoading: false,
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.auth.searchedUser)
    let { searchedUser } = nextProps.auth

    if (nextProps.auth.searchedUser.followers === undefined) {
      this.setState({ isLoading: true })
    } else {
      this.setState({
        isLoading: false,
        followers: searchedUser.followers,
      })
    }
  }
  render() {
    let { searchedUser } = this.props.auth
    // let { isLoading } = this.state
    let { isLoading, followers } = this.state
    // let { following } = this.props
    // console.log(following)

    // if (!searchedUser) {
    //   r
    // }
    if (isLoading || searchedUser === null) {
      return (
        <div>
          <p>isLoading</p>
        </div>
      )
    } else if (followers.length < 0) {
      return (
        <div>
          <p>Hello</p>
        </div>
      )
    } else {
      let renderFolloweringList = followers.map((user) => {
        return <UsersListItem user={user.user} key={user._id} />
      })
      return <div>{renderFolloweringList}</div>
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(FollowersList)

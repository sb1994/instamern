import React, { Component } from 'react'
import { connect } from 'react-redux'
import UsersListItem from './UsersListItem'
import { withRouter } from 'react-router-dom'
class FollowingList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      following: [],
      isLoading: false,
    }
  }
  componentDidMount() {
    // console.log(this.props.following)
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.auth.searchedUser)
    // console.log(nextProps.following)
    let { searchedUser } = nextProps.auth

    if (nextProps.auth.searchedUser.following === undefined) {
      this.setState({ isLoading: true })
    } else {
      this.setState({
        isLoading: false,
        following: searchedUser.following,
      })
    }
  }
  render() {
    let { searchedUser } = this.props.auth
    // let { isLoading } = this.state
    let { isLoading, following } = this.state

    if (following === undefined) {
      return <div>isLoading</div>
    } else if (following.length <= 0) {
      return <div>You are following</div>
    } else {
      let renderFollowingList = following.map((user) => {
        return <UsersListItem key={user._id} user={user.user} />
      })
      return <div>{renderFollowingList}</div>
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FollowingList)
)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import UsersListItem from './UsersListItem'
import { withRouter } from 'react-router-dom'

class FollowersList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      followers: [],
      isLoading: false,
    }
  }
  componentDidMount() {
    // console.log(this.props.auth.searchedUser.followers.length)
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps.match.params.action)
    console.log(prevProps.auth.searchedUser.followers)
    if (
      prevProps.auth.searchedUser.followers !==
      this.props.auth.searchedUser.followers
    ) {
      console.log(this.props.auth.searchedUser.followers)
      this.setState({
        followers: this.props.auth.searchedUser.followers,
      })
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   // console.log(nextProps.auth.searchedUser)
  //   let { searchedUser } = nextProps.auth

  //   if (nextProps.auth.searchedUser.followers === undefined) {
  //     this.setState({ isLoading: true })
  //   } else {
  //     this.setState({
  //       isLoading: false,
  //       followers: searchedUser.followers,
  //     })
  //   }
  // }
  render() {
    let { searchedUser } = this.props.auth
    // let { isLoading } = this.state
    let { isLoading, followers } = this.state
    if (isLoading || searchedUser === null) {
      return (
        <div>
          <p>isLoading</p>
        </div>
      )
    } else if (followers.length <= 0) {
      return (
        <div>
          <p>You have Nobody following you :( </p>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FollowersList)
)

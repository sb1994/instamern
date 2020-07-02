import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class UsersListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  showUserProfile = () => {
    // console.log(this.props)
    let { history, user } = this.props
    history.push(`/profile/${user._id}`)
  }
  render() {
    let { user } = this.props
    return (
      <div className='list-group-item'>
        <img
          src={user.profile_pic}
          alt=''
          className='img-fluid'
          onClick={this.showUserProfile}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UsersListItem)
)

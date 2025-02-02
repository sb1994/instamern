import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class UsersListItem extends Component {
  constructor(props) {
    super(props)
  }

  showUserProfile = () => {
    // console.log(this.props)
    let { history, user } = this.props
    history.push(`/profile/${user._id}/posts`)
  }
  render() {
    let { user } = this.props

    return (
      <div className='list-group-item'>
        <div className='row'>
          <div className='col-6' onClick={this.showUserProfile}>
            <img
              src={user.profile_pic}
              alt=''
              className='img-fluid float-left'
              style={{ height: 100 }}
            />
            <p>{user.name}</p>
          </div>
          <div className='col-6'>Inputs</div>
        </div>
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

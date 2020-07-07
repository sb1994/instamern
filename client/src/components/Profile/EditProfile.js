import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentUser } from '../../actions/userAuthActions'
class EditProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.props.getCurrentUser(this.props.auth.user.id)
  }
  render() {
    let { user } = this.props.auth

    return (
      <div className='container'>
        <h1>Edit Profile</h1>
        <p>{user.name}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, { getCurrentUser })(EditProfile)

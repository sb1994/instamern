import React, { Component } from 'react'
import { connect } from 'react-redux'

class EditProfile extends Component {
  render() {
    return (
      <div>
        <h1>Edit Profile</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)

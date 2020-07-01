import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Profile extends Component {
  render() {
    return (
      <div>
        <h1>Profile</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

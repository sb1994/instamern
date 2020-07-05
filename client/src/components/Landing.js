import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentUser } from '../actions/userAuthActions'
class Landing extends Component {
  componentDidMount() {
    console.log(this.props.auth.isAuthenticated)
    let { isAuthenticated, user } = this.props.auth
    if (isAuthenticated) {
      this.props.getCurrentUser(user._id)
      this.props.history.push(`/profile/${user._id}`)
    }
  }
  render() {
    return (
      <div className='container'>
        <h1>Landing</h1>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}
export default connect(mapStateToProps, { getCurrentUser })(Landing)

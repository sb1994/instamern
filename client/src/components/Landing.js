import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentUser } from '../actions/userAuthActions'
class Landing extends Component {
  componentDidMount() {
    console.log(this.props.auth.isAuthenticated)
    let { isAuthenticated, user } = this.props.auth
    console.log(user)

    if (isAuthenticated) {
      // this.props.getCurrentUser(user.id)
      this.props.history.push(`/profile/${user._id}`)
    }
  }
  componentDidUpdate() {}
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

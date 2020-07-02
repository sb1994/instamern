import React, { Component } from 'react'
import { connect } from 'react-redux'
class Landing extends Component {
  componentDidMount() {
    console.log(this.props.auth.isAuthenticated)
    let { isAuthenticated } = this.props.auth
    if (isAuthenticated) {
      this.props.history.push('/profile')
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
export default connect(mapStateToProps, {})(Landing)

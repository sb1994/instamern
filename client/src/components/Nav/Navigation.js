import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setLoggedUser, logoutUser } from '../../actions/userAuthActions'

import {
  Nav,
  NavDropdown,
  Navbar,
  FormControl,
  Form,
  Button,
} from 'react-bootstrap'
class Navigation extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  onLogoutClick = () => {
    //dispatchs the logout function
    this.props.logoutUser()
  }
  render() {
    let { isAuthenticated, user } = this.props.auth

    //logged in and loggedout links
    const authLinks = (
      <Fragment>
        <Nav.Link href='/recommended'>Explore</Nav.Link>
        <Nav.Link href={`/profile/${user._id}/posts`}>
          <img
            src={user.profile_pic}
            style={{ height: 30 }}
            className='img-fluid'
          />
        </Nav.Link>
        <button className='btn btn-primary' onClick={this.onLogoutClick}>
          Logout
        </button>
      </Fragment>
    )
    const unAuthLinks = (
      <Fragment>
        <Nav.Link href='/login'>Login</Nav.Link>
        <Nav.Link href='/register'>Register</Nav.Link>
      </Fragment>
    )
    return (
      <Fragment>
        <Navbar bg='light' expand='lg'>
          <Navbar.Brand href={`/`}>InstaMern</Navbar.Brand>
          <Nav className='ml-auto'>
            {isAuthenticated ? authLinks : unAuthLinks}
          </Nav>
        </Navbar>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default withRouter(connect(mapStateToProps, { logoutUser })(Navigation))

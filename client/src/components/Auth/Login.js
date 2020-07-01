import React, { Component } from 'react'
import { loginAuth } from '../../actions/userAuthActions'
import { connect } from 'react-redux'
class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }
  componentDidMount() {
    let { auth, history } = this.props
    // console.log(isAuthenticated)

    if (auth.isAuthenticated) {
      history.push('/profile')
    }
  }
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    let { email, password } = this.state
    if (email === '' || password === '') {
      alert('Both Inputs Are Required')
    } else {
      this.props.loginAuth(email, password)
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.auth)
  }

  render() {
    let { email, password } = this.state
    return (
      <div className='container'>
        <div className='col-12 col-md-8'>
          <h1 className='text-center'>Login</h1>
          <div className='form-group'>
            <label htmlFor='emailInput'>Email address</label>
            <input
              type='email'
              className='form-control'
              id='emailInput'
              placeholder='Enter email'
              onChange={this.handleInputChange}
              name='email'
              autoFocus
              value={email}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='passwordInput'>Password</label>
            <input
              type='text'
              className='form-control'
              id='passwordInput'
              placeholder='Password'
              onChange={this.handleInputChange}
              name='password'
              value={password}
            />
          </div>
          <button className='btn btn-primary' onClick={this.handleSubmit}>
            Login
          </button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    auth: state.auth,
  }
}
export default connect(mapStateToProps, { loginAuth })(Login)

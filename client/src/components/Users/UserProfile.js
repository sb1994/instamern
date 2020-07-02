import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSearchedUser } from '../../actions/userAuthActions'

export class UserProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  componentDidMount() {
    let { match } = this.props
    console.log(match.params.id)
    this.props.getSearchedUser(match.params.id)
  }

  render() {
    let { searchedUser, user } = this.props.auth
    console.log(user)

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='row'>
              <div className='col-3'>
                <img
                  height={100}
                  src={searchedUser.profile_pic}
                  alt=''
                  srcset=''
                  className='rounded float-left'
                />
              </div>
              <div className='col-8'>
                <div className='row'>
                  <h4>{searchedUser.name}</h4>
                  {searchedUser._id === user.id ? (
                    <button>Edit Profile</button>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, { getSearchedUser })(UserProfile)

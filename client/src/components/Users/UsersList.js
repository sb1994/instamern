import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../../actions/userAuthActions'
//list item
import UserListItem from './UsersListItem'

class UsersList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      users: [],
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    })
    this.props.getUsers()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.auth.users,
      isLoading: false,
    })
  }

  render() {
    let { users, isLoading } = this.state
    let renderUsers = users.map((user, i) => {
      return <UserListItem key={i} user={user} />
    })
    if (isLoading) {
      return <div>isLoading</div>
    } else {
      return (
        <div className='container'>
          <p>UsersList</p>
          <div className='row'>
            <ul className='list-group col-12 list-group-flush'>
              {renderUsers}
            </ul>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { getUsers })(UsersList)

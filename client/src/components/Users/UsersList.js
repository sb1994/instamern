import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../../actions/userAuthActions'
//list item
import UserListItem from './UsersListItem'

class UsersList extends Component {
  componentDidMount() {
    this.props.getUsers()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.auth.users,
    })
  }
  constructor(props) {
    super(props)

    this.state = {
      users: [],
    }
  }

  render() {
    let renderUsers = this.state.users.map((user, i) => {
      return <UserListItem key={i} user={user} />
    })
    return (
      <div className='container'>
        <p>UsersList</p>
        <div className='row'>
          <ul className='list-group col-12 list-group-flush'>{renderUsers}</ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { getUsers })(UsersList)

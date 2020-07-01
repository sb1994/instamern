import {
  FILTER_USERS,
  GET_USERS,
  ADD_FRIEND,
  GET_USER,
  SUCCESS_ADD_FRIEND,
  FAIL_ADD_FRIEND
} from '../actions/action_types'

const initialState = {
  users: [],
  user: {},
  loading: false
}
const search = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_USERS:
      return {
        ...state,
        loading: false
      }
    case GET_USERS:
      return {
        ...state,
        users: action.payload.users,
        loading: false
      }
    case ADD_FRIEND:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
export default search

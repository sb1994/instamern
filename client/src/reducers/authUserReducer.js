import { SET_LOGGED_USER, SET_SEARCHED_USER } from '../actions/action_types'
import { updateStateObject } from '../utils/setState'
import isEmpty from '../validation/isEmpty'

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  isAuthenticated: false,
  user: {},
  searchedUser: {}
}

const startAuth = (state, action) => {
  return updateStateObject(state, {
    error: null,
    loading: true
  })
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case SET_SEARCHED_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        searchedUser: action.payload
      }
    default:
      return state
  }
}

export default auth

import { combineReducers } from 'redux'
import authUserReducer from './authUserReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  auth: authUserReducer,
  errors: errorReducer,
})

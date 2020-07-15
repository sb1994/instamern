<<<<<<< HEAD
import { combineReducers } from 'redux'
import authUserReducer from './authUserReducer'
import userPostReducer from './userPostReducer'
import errorReducer from './errorReducer'
=======
import { combineReducers } from "redux";
import authUserReducer from "./authUserReducer";
import userPostReducer from "./userPostReducer";
import errorReducer from "./errorReducer";
>>>>>>> 1654a56b7561ffd23e19216a2c116a91092a88aa

export default combineReducers({
  auth: authUserReducer,
  post: userPostReducer,
<<<<<<< HEAD
  errors: errorReducer,
})
=======
  errors: errorReducer
});
>>>>>>> 1654a56b7561ffd23e19216a2c116a91092a88aa

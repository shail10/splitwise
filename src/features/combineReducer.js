import { combineReducers } from 'redux'

import transactionReducer from './transaction/transactionReducer'

import userReducer from './user/userReducer'

export default combineReducers({
  transaction: transactionReducer,
  user: userReducer,
})

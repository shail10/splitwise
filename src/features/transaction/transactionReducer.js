import {
  ADD_EXPENSES,
  SET_INITIAL_TRANSACTION_STATE,
  REMOVE_TRANSACTION_STATE,
  GET_ALL_TRANSACTION,
  CURRENT_USER,
} from '../../utils/constant'

const initialState = {
  transactions: [],
}

const transactionReducer = (newstate = initialState, action) => {
  const state = { ...newstate }
  if (action.type === ADD_EXPENSES) {
    state.transactions.push(action.payload)
    return state
  }
  if (action.type === REMOVE_TRANSACTION_STATE) {
    state.transactions = []
    return state
  }
  if (action.type === SET_INITIAL_TRANSACTION_STATE) {
    state.transactions = JSON.parse(localStorage.getItem(GET_ALL_TRANSACTION))
    return state
  }
  return state
}

export default transactionReducer

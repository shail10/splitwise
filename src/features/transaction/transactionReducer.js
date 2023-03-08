import {
  ADD_EXPENSES,
  SET_INITIAL_TRANSACTION_STATE,
  REMOVE_TRANSACTION_STATE,
  GET_ALL_TRANSACTION,
  CURRENT_USER,
} from '../../utils/constant'

const initialState = {
  transactions:
    localStorage.getItem(GET_ALL_TRANSACTION) &&
    localStorage.getItem(CURRENT_USER)
      ? JSON.parse(localStorage.getItem(GET_ALL_TRANSACTION))
      : [],
}

const transactionReducer = (newstate = initialState, action) => {
  const state = { ...newstate }
  if (action.type === ADD_EXPENSES) {
    let totalPercentage = 0
    action.payload.students.map(({ paidFor, percentage }) => {
      totalPercentage += percentage
    })
    if (totalPercentage != 100) {
      throw new Error('Percentage does not add upto 100')
    } else {
      state.transactions.push(action.payload)
      const allTransactions =
        JSON.parse(localStorage.getItem('all-transaction')) || []

      allTransactions.push(action.payload)

      localStorage.setItem('all-transaction', JSON.stringify(allTransactions))
      console.log(action.payload)
      return state
    }
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

import { createSlice } from '@reduxjs/toolkit'
import { GET_ALL_TRANSACTION, CURRENT_USER } from '../../utils/constant'

const initialState = {
  transactions:
    localStorage.getItem(GET_ALL_TRANSACTION) &&
    localStorage.getItem(CURRENT_USER)
      ? JSON.parse(localStorage.getItem(GET_ALL_TRANSACTION))
      : [],
}

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addExpenses: (state, { payload }) => {
      state.transactions.push(payload)
    },
    removeTransactionState: (state) => {
      state.transactions = []
      console.log(state.transactions)
    },
    setInitialTransactionState: (state) => {
      state.transactions = JSON.parse(localStorage.getItem(GET_ALL_TRANSACTION))
    },
  },
})
export const {
  addExpenses,
  removeTransactionState,
  setInitialTransactionState,
} = transactionSlice.actions
export default transactionSlice.reducer

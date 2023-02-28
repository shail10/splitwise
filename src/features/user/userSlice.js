import { createSlice } from '@reduxjs/toolkit'
import { CURRENT_USER } from '../../utils/constant'

const initialState = {
  user: !localStorage.getItem(CURRENT_USER)
    ? {}
    : JSON.parse(localStorage.getItem(CURRENT_USER)),
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInitialUserState: (state, { payload }) => {
      // console.log(payload.transaction)
      state.user = payload
    },
    removeUserState: (state) => {
      state.user = {}
    },
  },
})

export const { setInitialUserState, removeUserState } = userSlice.actions

export default userSlice.reducer

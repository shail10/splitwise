import {
  SET_INITIAL_USER_STATE,
  REMOVE_USER_STATE,
  CURRENT_USER,
} from '../../utils/constant'

const initialState = {
  user: !localStorage.getItem(CURRENT_USER)
    ? {}
    : JSON.parse(localStorage.getItem(CURRENT_USER)),
}

const userReducer = (newstate = initialState, action) => {
  const state = { ...newstate }
  if (action.type === REMOVE_USER_STATE) {
    state.user = {}
    return state
  }

  if (action.type === SET_INITIAL_USER_STATE) {
    state.user = action.payload
    return state
  }
  return state
}

export default userReducer

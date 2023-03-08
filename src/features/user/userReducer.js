import {
  SET_INITIAL_USER_STATE,
  REMOVE_USER_STATE,
  CURRENT_USER,
  ALL_USERS,
  ONREGISTER,
  ONLOGIN,
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

  if (action.type === ONREGISTER) {
    const allUser = JSON.parse(localStorage.getItem(ALL_USERS)) || []
    let alreadyRegistered = false
    allUser.map((user) => {
      if (
        user.username === action.payload.username ||
        user.email === action.payload.email
      ) {
        alreadyRegistered = true
      }
    })
    if (alreadyRegistered) throw new Error('User Already Exist')
    else {
      allUser.push(action.payload)
      localStorage.setItem(ALL_USERS, JSON.stringify(allUser))
      // console.log('userAdded')
    }
  }

  if (action.type === ONLOGIN) {
    const allUser = JSON.parse(localStorage.getItem(ALL_USERS)) || []
    let userExist = false
    allUser.map((user) => {
      if (
        user.email === action.payload.email &&
        user.password === action.payload.password
      ) {
        state.user = user
        userExist = true
        // console.log('hello')
        localStorage.setItem(CURRENT_USER, JSON.stringify(user))
        return state
      }
    })
    if (!userExist) {
      throw new Error('User does not exist')
    }
  }

  return state
}

export default userReducer

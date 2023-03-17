import { act } from 'react-dom/test-utils';
import { SET_INITIAL_USER_STATE, REMOVE_USER_STATE, CURRENT_USER, ALL_USERS, ONREGISTER, ONLOGIN, UPDATE_USER } from '../../utils/constant';

const initialState = {
  user: !localStorage.getItem(CURRENT_USER) ? {} : JSON.parse(localStorage.getItem(CURRENT_USER)),
};

const userReducer = (newstate = initialState, action) => {
  const state = { ...newstate };
  if (action.type === REMOVE_USER_STATE) {
    state.user = {};
    return state;
  }

  if (action.type === SET_INITIAL_USER_STATE) {
    state.user = action.payload;
    return state;
  }

  if (action.type === ONREGISTER) {
    const allUser = JSON.parse(localStorage.getItem(ALL_USERS)) || [];
    let alreadyRegistered = false;
    allUser.map((user) => {
      if (user.username === action.payload.username || user.email === action.payload.email) {
        alreadyRegistered = true;
      }
    });
    if (alreadyRegistered) throw new Error('User Already Exist');
    else {
      allUser.push(action.payload);
      localStorage.setItem(ALL_USERS, JSON.stringify(allUser));
      // console.log('userAdded')
    }
  }

  if (action.type === ONLOGIN) {
    const allUser = JSON.parse(localStorage.getItem(ALL_USERS)) || [];
    let userExist = false;
    allUser.map((user) => {
      if (user.email === action.payload.email && user.password === action.payload.password) {
        state.user = user;
        userExist = true;
        // console.log('hello')
        localStorage.setItem(CURRENT_USER, JSON.stringify(user));
        return state;
      }
    });
    if (!userExist) {
      throw new Error('User does not exist');
    }
  }

  if (action.type === UPDATE_USER) {
    const allUser = JSON.parse(localStorage.getItem(ALL_USERS)) || [];
    for (let i = 0; i < allUser.length; i++) {
      if (allUser[i].email === action.payload.email && allUser[i].password === action.payload.oldPassword) {
        allUser[i].name = action.payload.name;
        allUser[i].password = action.payload.password;
        allUser[i].email = action.payload.email;
        localStorage.setItem(ALL_USERS, JSON.stringify(allUser));
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.password = action.payload.password;
        return state;
      }
    }
    throw new Error('Incorrect password');
  }

  return state;
};

export default userReducer;

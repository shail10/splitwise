import { CURRENT_USER } from '../utils/constant'
export const Authenticate = () => {
  const auth = {
    isAuthenticated: false,
  }
  const logedInUser = JSON.parse(localStorage.getItem(CURRENT_USER))
  if (logedInUser) {
    // console.log('here')
    auth.isAuthenticated = true
  }
  return auth
}

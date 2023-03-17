import { CURRENT_USER } from '../utils/constant';

const Authenticate = () => {
  const auth = {
    isAuthenticated: false,
  };
  const logedInUser = JSON.parse(localStorage.getItem(CURRENT_USER));
  if (logedInUser) {
    auth.isAuthenticated = true;
  }
  return auth;
};

export default Authenticate;

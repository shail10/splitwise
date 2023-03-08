import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
  CURRENT_USER,
  REMOVE_TRANSACTION_STATE,
  REMOVE_USER_STATE,
} from '../utils/constant'

const Navbar = ({ history }) => {
  const dispatch = useDispatch()
  const logOut = (e) => {
    // dispatch(removeTransactionState())
    dispatch({ type: REMOVE_TRANSACTION_STATE })
    dispatch({ type: REMOVE_USER_STATE })
    // dispatch(removeUserState())
    localStorage.removeItem(CURRENT_USER)
    history.push('/')
  }
  return (
    <NavContainer>
      <div className='nav-header'>
        <div className='home'>
          <Link to='/'>
            <button>Splitwise</button>
          </Link>
        </div>
        <div>
          {localStorage.getItem('current-user') == undefined ? (
            <>
              <div>
                <Link to='/login'>
                  <button className='login'>Login</button>
                </Link>
                <Link to='/register'>
                  <button className='register'>Register</button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link to='/analytics'>
                  <button className='new-note'>Analytics</button>
                </Link>
                <Link to='/your-expenses'>
                  <button className='new-note'>Expenses</button>
                </Link>
                <Link to='/dashboard'>
                  <button className='new-note'>Dashboard</button>
                </Link>
                <Link to='/add-expenses'>
                  <button className='new-note'>Add</button>
                </Link>
                <Link to='/profile'>
                  <button className='new-note'>Profile</button>
                </Link>
                <Link to='/'>
                  <button className='new-note' onClick={logOut}>
                    Logout
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  height: 4rem;
  max-width: 900px;
  align-items: center;
  justify-content: center;
  margin: 10px auto 60px;

  .remove {
    display: none;
  }

  .new-note {
    margin-right: 10px;
  }

  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #e5fbf5;
  }
  .login {
    margin-right: 10px;
  }

  button {
    /* display: block; */
    margin: 20px auto;
    width: 80px;
    height: 30px;
    border-radius: 10px;
    border: none;
    /* color: #eee; */
    background: var(--buttonColor);
    color: white;
    font-size: 15px;
    box-shadow: 1px 4px 10px 1px #aaa;
  }

  button:hover {
    background: black;
    color: white;
  }
`

export default Navbar

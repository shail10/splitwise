import React from 'react'
import { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import {
  CURRENT_USER,
  SET_INITIAL_USER_STATE,
  SET_INITIAL_TRANSACTION_STATE,
} from '../utils/constant'

import { useDispatch, useSelector } from 'react-redux'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const totalUsers = JSON.parse(localStorage.getItem('total-users'))
    for (let user of totalUsers) {
      if (user.email === email && user.password === password) {
        console.log('UserLogedIn Successfully')
        localStorage.setItem(CURRENT_USER, JSON.stringify(user))
        // dispatch(setInitialUserState(user))
        dispatch({ type: SET_INITIAL_USER_STATE, payload: user })
        dispatch({ type: SET_INITIAL_TRANSACTION_STATE })
        // dispatch(setInitialTransactionState())
        history.push('/dashboard')
        break
      }
    }
  }

  return (
    <Wrapper>
      <h1>Login Yourself</h1>
      <div>
        <form onSubmit={handleSubmit}>
          {/* For Email */}
          <input
            type='email'
            id='email'
            autoComplete='off'
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            value={email}
            required
            placeholder='Email'
          />
          {/* For Password */}
          <input
            type='password'
            id='password'
            autoComplete='off'
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            value={password}
            required
            placeholder='Enter your password'
          />

          <button disabled={!email || !password ? true : false}>Login</button>
          <p style={{ 'margin-top': '1.5rem', 'margin-left': '10rem' }}>
            New here? <Link to='/register'>Register</Link> here.
          </p>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 600px;
  /* height: 800px; */
  margin: 0 auto;
  background-color: #fcfcfc;
  padding: 20px 50px 40px;
  box-shadow: 1px 4px 10px 1px #aaa;
  font-family: sans-serif;

  * {
    box-sizing: border-box;
  }

  h2 {
    text-align: center;
    margin-bottom: 30px;
  }

  input {
    margin-bottom: 15px;
  }

  input {
    display: block;
    height: 32px;
    padding: 6px 16px;
    width: 100%;
    border: none;
    background-color: #f3f3f3;
  }
  label {
    color: #777;
    font-size: 0.8em;
  }

  button {
    display: block;
    margin: 20px auto 0;
    width: 150px;
    height: 40px;
    border-radius: 25px;
    border: none;
    color: #eee;
    font-weight: 700;
    font-size: 15px;
    box-shadow: 1px 4px 10px 1px #aaa;

    background: var(--buttonColor);
  }
  button:hover {
    background: black;
  }
`

export default Login

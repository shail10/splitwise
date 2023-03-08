import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ONREGISTER } from '../../utils/constant'

import {
  NAME,
  USERNAME,
  EMAIL,
  PASSWORD,
  CONFIRM_PASSWORD,
} from '../../utils/formConstants'

const Register = ({ history }) => {
  const dispatch = useDispatch()

  const [user, setUser] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    validConfirmPassword: false,
    username: '',
    email: '',
  })

  useEffect(() => {
    setUser({
      ...user,
      validConfirmPassword: user.password === user.confirmPassword,
    })
  }, [user.password, user.confirmPassword])

  const handleOnChange = (e) => {
    if (e.target.id === NAME) {
      setUser({ ...user, name: e.target.value })
    }
    if (e.target.id === PASSWORD) {
      setUser({ ...user, password: e.target.value })
    }
    if (e.target.id === CONFIRM_PASSWORD) {
      setUser({ ...user, confirmPassword: e.target.value })
    }
    if (e.target.id === USERNAME) {
      setUser({ ...user, username: e.target.value })
    }
    if (e.target.id === EMAIL) {
      setUser({ ...user, email: e.target.value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const currentUser = {
      name: user.name,
      email: user.email,
      username: user.username,
      password: user.password,
    }
    try {
      dispatch({ type: ONREGISTER, payload: currentUser })
      history.push('/login')
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }

  return (
    <Wrapper>
      <h1>Register Yourself</h1>
      <div>
        <form onSubmit={handleSubmit}>
          {/* For Name */}
          <input
            type='text'
            id={NAME}
            autoComplete='off'
            onChange={(e) => {
              handleOnChange(e)
            }}
            value={user.name}
            required
            placeholder='Name'
          />
          {/* For Username */}
          <input
            type='text'
            id={USERNAME}
            autoComplete='off'
            onChange={(e) => {
              handleOnChange(e)
            }}
            value={user.username}
            required
            placeholder='Username'
          />
          {/* For Email */}
          <input
            type='email'
            id={EMAIL}
            autoComplete='off'
            onChange={(e) => {
              handleOnChange(e)
            }}
            value={user.email}
            required
            placeholder='Email'
          />
          {/* For Password and Confirm Password */}
          <input
            type='password'
            id={PASSWORD}
            autoComplete='off'
            onChange={(e) => {
              handleOnChange(e)
            }}
            value={user.password}
            required
            placeholder='Password'
          />
          <input
            type='password'
            id={CONFIRM_PASSWORD}
            autoComplete='off'
            onChange={(e) => {
              handleOnChange(e)
            }}
            value={user.confirmPassword}
            required
            placeholder='Enter password again'
          />

          <button
            disabled={
              !user.validConfirmPassword ||
              !user.name ||
              !user.username ||
              !user.email
            }
          >
            Sign Up
          </button>
          <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
          <p style={{ 'margin-top': '1.5rem', 'margin-left': '7.2rem' }}>
            Already have an account? <Link to='/login'>Login</Link> here.
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
    border: solid #e0e0e0;
    background-color: white;
    border-radius: 0.5rem;
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

export default Register

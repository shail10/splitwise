import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Register = ({ history }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validConfirmPassword, setValidConfirmPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    setValidConfirmPassword(password === confirmPassword)
  }, [password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const currentUser = {
      name: name,
      email: email,
      username: username,
      password: password,
    }

    const allUser = JSON.parse(localStorage.getItem('total-users')) || []
    allUser.push(currentUser)

    localStorage.setItem('total-users', JSON.stringify(allUser))
    console.log('userAdded')
  }

  return (
    <Wrapper>
      <h1>Register Yourself</h1>
      <div>
        <form onSubmit={handleSubmit}>
          {/* For Name */}
          <input
            type='text'
            id='name'
            autoComplete='off'
            onChange={(e) => {
              setName(e.target.value)
            }}
            value={name}
            required
            placeholder='Name'
          />
          {/* For Username */}
          <input
            type='text'
            id='username'
            autoComplete='off'
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            value={username}
            required
            placeholder='Username'
          />
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
          {/* For Password and Confirm Password */}
          <input
            type='password'
            id='password'
            autoComplete='off'
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            value={password}
            required
            placeholder='Password'
          />
          <input
            type='password'
            id='confirmPassword'
            autoComplete='off'
            onChange={(e) => {
              setConfirmPassword(e.target.value)
            }}
            value={confirmPassword}
            required
            placeholder='Enter password again'
          />

          <button disabled={!validConfirmPassword ? true : false}>
            Sign Up
          </button>
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

export default Register

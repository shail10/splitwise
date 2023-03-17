import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SET_INITIAL_TRANSACTION_STATE, ONLOGIN } from '../../utils/constant';

import { useDispatch } from 'react-redux';

const Login = ({ history }) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({ email: '', password: '' });

  const handleOnChange = (e) => {
    if (e.target.id === 'email') {
      setUser({ ...user, email: e.target.value });
    }
    if (e.target.id === 'password') {
      setUser({ ...user, password: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: ONLOGIN, payload: user });
      dispatch({ type: SET_INITIAL_TRANSACTION_STATE });
      history.push('/dashboard');
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
      });
    }
  };

  return (
    <Wrapper>
      <h1>Login Yourself</h1>
      <div>
        <form onSubmit={handleSubmit}>
          {/* For Email */}
          <input
            label="email"
            type="email"
            id="email"
            autoComplete="off"
            onChange={(e) => {
              handleOnChange(e);
            }}
            value={user.email}
            required
            placeholder="Email"
          />
          {/* For Password */}
          <input
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => {
              handleOnChange(e);
            }}
            value={user.password}
            required
            placeholder="Enter your password"
          />

          <button disabled={!user.email || !user.password ? true : false}>Login</button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <p style={{ 'margin-top': '1.5rem', 'margin-left': '10rem' }}>
            New here? <Link to="/register">Register</Link> here.
          </p>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 600px;
  /* height: 800px; */
  margin: 0 auto;
  background-color: #fcfcfc;
  padding: 20px 50px 40px;
  box-shadow: 1px 4px 10px 1px #aaa;
  font-family: sans-serif;
  border-radius: 1rem;

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
`;

export default Login;

/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

import { CURRENT_USER, REMOVE_TRANSACTION_STATE, REMOVE_USER_STATE } from '../utils/constant';

function Navbar({ history }) {
  const items = [
    {
      label: <Link to="/analytics">Categorical</Link>,
      key: '0',
    },
    {
      label: <Link to="/practice">Date Wise</Link>,
      key: '1',
    },
  ];
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch({ type: REMOVE_TRANSACTION_STATE });
    dispatch({ type: REMOVE_USER_STATE });
    localStorage.removeItem(CURRENT_USER);
    history.push('/');
  };
  return (
    <NavContainer>
      <div className="nav-header">
        <div className="home">
          <Link to="/">
            <button type="button">Splitwise</button>
          </Link>
        </div>
        <div>
          {localStorage.getItem('current-user') === undefined ? (
            <div>
              <Link to="/login">
                <button type="button" className="login">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button type="button" className="register">
                  Register
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <button type="button" style={{ marginRight: '0.7rem', width: '7rem' }}>
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={['click']}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space style={{ marginRight: '1rem' }}>Analytics</Space>
                    <DownOutlined />
                  </a>
                </Dropdown>
              </button>
              <Link to="/your-expenses">
                <button type="button" className="new-note">
                  Expenses
                </button>
              </Link>
              <Link to="/dashboard">
                <button type="button" className="new-note">
                  Dashboard
                </button>
              </Link>
              <Link to="/add-expenses">
                <button type="button" className="new-note">
                  Add
                </button>
              </Link>
              <Link to="/profile">
                <button type="button" className="new-note">
                  Profile
                </button>
              </Link>
              <Link to="/">
                <button className="new-note" onClick={logOut} type="button">
                  Logout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </NavContainer>
  );
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
`;

export default Navbar;

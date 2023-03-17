import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Form, Input } from 'antd';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { UPDATE_USER, ONLOGIN } from '../../utils/constant';

function AddExpenses({ history }) {
  const [form] = Form.useForm();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    setValidPassword(password === confirmPassword);
  }, [password, confirmPassword]);

  const handleSubmit = async (formValues) => {
    let values = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      username: currentUser.username,
      oldPassword: formValues.oldPassword,
    };
    // console.log(values)
    try {
      dispatch({ type: UPDATE_USER, payload: values });
      history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Wrapper>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 13 }}
        onFinish={handleSubmit}
        initialValues={{
          name: currentUser.name,
          email: currentUser.email,
        }}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please enter your name!',
              type: 'text',
            },
          ]}
          name="name"
          label="Name"
        >
          <Input placeholder="Enter your name."></Input>
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
              type: 'email',
            },
          ]}
        >
          <Input disabled={true} placeholder="Enter your name."></Input>
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please enter your old password!',
            },
          ]}
          name="oldPassword"
          label="Old Password"
        >
          <Input.Password placeholder="Enter your old password."></Input.Password>
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please enter your new password!',
            },
          ]}
          name="password"
          label="Password"
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} placeholder="Enter your new password."></Input.Password>
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
          ]}
          name="confirmPassword"
          label="Confirm Password"
        >
          <Input.Password onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Enter your name."></Input.Password>
        </Form.Item>

        <Form.Item style={{ marginLeft: '300px' }}>
          <Button disabled={validPassword == false} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: white;
  padding: 5rem;
  max-width: 50rem;
  border-radius: 2rem;
  margin-left: 21rem;
`;

export default AddExpenses;

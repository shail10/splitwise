import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Switch,
  Upload,
  Input,
} from 'antd'
import styled from 'styled-components'

const { Option } = Select

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const Profile = () => {
  const currentUser = useSelector((state) => state.user.user)
  // console.log(currentUser)
  const [email, setEmail] = useState(currentUser.email)
  const [name, setName] = useState(currentUser.name)
  const [username, setUsername] = useState(currentUser.username)

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form Submitted')
    // console.log(currentUser)
    console.log(email)
    console.log(username)
    console.log(name)
  }

  return (
    <Wrapper>
      <Form
        name='validate_other'
        {...formItemLayout}
        initialValues={{
          Username: username,
          Name: name,
          Email: email,
        }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          type='text'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
          label='Username'
          name='Username'
          rules={[{ required: true, message: 'Please enter your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          type='text'
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
          label='Name'
          name='Name'
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          label='Email'
          name='Email'
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button
            onClick={handleSubmit}
            className={{ color: '#5bc4a6' }}
            type='primary'
            htmlType='submit'
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: white;
  padding: 5rem;
  max-width: 50rem;
  border-radius: 2rem;
  margin-left: 25rem;
`

export default Profile

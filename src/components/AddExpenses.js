import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Form, InputNumber, Select, Input } from 'antd'
import styled from 'styled-components'

import { ALL_USERS, ADD_EXPENSES } from '../utils/constant'

const { Option } = Select

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const Profile = ({ history }) => {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(0)
  const [paidBy, setPaidBy] = useState()
  const [paidFor, setPaidFor] = useState([])
  const dispatch = useDispatch()

  const allUsers = JSON.parse(localStorage.getItem(ALL_USERS))

  const handleSubmit = async (e) => {
    e.preventDefault()
    // dispatch(addExpenses({ description, amount, paidBy, paidFor }))
    dispatch({
      type: ADD_EXPENSES,
      payload: { description, amount, paidBy, paidFor },
    })
    const allTransactions =
      JSON.parse(localStorage.getItem('all-transaction')) || []

    allTransactions.push({ description, amount, paidBy, paidFor })

    localStorage.setItem('all-transaction', JSON.stringify(allTransactions))
    history.push('/dashboard')
  }

  return (
    <Wrapper>
      <Form
        name='validate_other'
        {...formItemLayout}
        initialValues={{
          'input-number': 3,
          'checkbox-group': ['A', 'B'],
          rate: 3.5,
        }}
        style={{ maxWidth: 600 }}
      >
        <h1 style={{ margin: '0rem 9rem 2rem 4rem' }}>Add Expenses</h1>
        <Form.Item
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
          }}
          required
          label='Description'
          name='Description'
          rules={[
            { required: true, message: 'Please enter your description!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='Paid-By'
          label='Paid By'
          id='PaidBy'
          hasFeedback
          rules={[{ required: true, message: 'Please select who paid!' }]}
        >
          <Select
            onChange={(e) => {
              setPaidBy(e)
            }}
            required
            placeholder='Please select who paid'
          >
            {allUsers.map((user) => {
              return (
                <Option key={user.id} value={user.username}>
                  {user.username}
                </Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name='select-multiple'
          label='Paid For'
          id='PaidFor'
          rules={[
            {
              required: true,
              message: 'Please select the people involved!',
              type: 'array',
            },
          ]}
        >
          <Select
            mode='multiple'
            onChange={(e) => {
              setPaidFor(e)
            }}
            required
            placeholder='Please select the people involved'
          >
            {allUsers.map((user) => {
              return (
                <Option key={user.id} value={user.username}>
                  {user.username}
                </Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label='Amount'
          value={amount}
          required
          onChange={(e) => {
            setAmount(e.target.value)
          }}
        >
          <Form.Item name='Amount' noStyle>
            <InputNumber min={1} max={100000} />
          </Form.Item>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button
            onClick={handleSubmit}
            className={{ color: '#5bc4a6' }}
            type='primary'
            htmlType='submit'
            disabled={
              !description || !amount || !paidBy || !paidFor ? true : false
            }
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
  margin-left: 21.5rem;
`

export default Profile

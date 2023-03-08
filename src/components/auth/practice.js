import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { ALL_USERS, ADD_EXPENSES } from '../../utils/constant'

import {
  Button,
  Col,
  Form,
  InputNumber,
  Row,
  Select,
  Switch,
  Input,
  Space,
} from 'antd'
import styled from 'styled-components'
import Operation from 'antd/es/transfer/operation'

function Practice() {
  const allUsers = JSON.parse(localStorage.getItem(ALL_USERS))
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const handleSubmit = async (formValues) => {
    // dispatch(addExpenses({ description, amount, paidBy, paidFor }))
    dispatch({
      type: ADD_EXPENSES,
      payload: formValues,
    })
    const allTransactions =
      JSON.parse(localStorage.getItem('all-transaction')) || []

    allTransactions.push(formValues)

    localStorage.setItem('all-transaction', JSON.stringify(allTransactions))
    // history.push('/dashboard')
  }

  return (
    <Wrapper>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 13 }}
        onFinish={handleSubmit}
      >
        <Form.Item name='description' label='Description'>
          <Input placeholder='Enter Your Description.'></Input>
        </Form.Item>

        <Form.Item name='paidBy' label='Paid By'>
          <Select placeholder='Select who paid'>
            {allUsers.map((user) => {
              return (
                <Select.Option key={user.id} value={user.username}>
                  {user.username}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item name='amount' label='Amount'>
          <InputNumber placeholder='Enter Your anount.'></InputNumber>
        </Form.Item>
        <Form.List name='students'>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => {
                return (
                  <Space
                    key={field.key}
                    direction='horizontal'
                    style={{ width: 800 }}
                  >
                    <Form.Item
                      style={{ width: 200 }}
                      name={[field.name, 'paidFor']}
                      label={index + 1}
                    >
                      <Select placeholder='Select who paid'>
                        {allUsers.map((user) => {
                          return (
                            <Select.Option key={user.id} value={user.username}>
                              {user.username}
                            </Select.Option>
                          )
                        })}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      style={{ width: 500 }}
                      name={[field.name, 'percentage']}
                    >
                      <InputNumber placeholder='Enter percentage'></InputNumber>
                    </Form.Item>
                  </Space>
                )
              })}
              <Form.Item>
                <Button
                  onClick={() => {
                    add()
                  }}
                >
                  Add
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item style={{ marginLeft: '300px' }}>
          <Button type='primary' htmlType='submit'>
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

export default Practice

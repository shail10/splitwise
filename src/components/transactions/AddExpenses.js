import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { ALL_USERS, ADD_EXPENSES } from '../../utils/constant'
import { CATEGORIES } from '../../utils/formConstants'

import { Button, Form, InputNumber, Select, Input, Space } from 'antd'
import styled from 'styled-components'

import { PEOPLE_INVOLVED } from '../../utils/formConstants'

function AddExpenses({ history }) {
  const [paidFor, setPaidFor] = useState([])
  const [students, setStudents] = useState([])
  const [availableOptions, setAvailableOptions] = useState([])
  const allUsers = JSON.parse(localStorage.getItem(ALL_USERS))
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  allUsers.map((user) => {})

  const handleSubmit = async (formValues) => {
    try {
      dispatch({
        type: ADD_EXPENSES,
        payload: formValues,
      })

      history.push('/dashboard')
    } catch (error) {
      alert(error)
    }
    // console.log(formValues)
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
                <Select.Option key={user.id} value={user.username}>
                  {user.username}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item name='categories' label='Categories'>
          <Select placeholder='Select your category'>
            {CATEGORIES.map((category) => {
              return (
                <Select.Option key={category.id} value={category}>
                  {category}
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
                      style={{ width: 400 }}
                      name={[field.name, 'paidFor']}
                      label={index + 1}
                    >
                      <Select
                        onSelect={(e) => {
                          setAvailableOptions([...availableOptions, e])
                        }}
                        placeholder='Select who was involoved'
                      >
                        {allUsers.map((user) => {
                          if (
                            availableOptions.includes(user.username) === false
                          ) {
                            return (
                              <Select.Option
                                key={user.id}
                                value={user.username}
                              >
                                {user.username}
                              </Select.Option>
                            )
                          }
                        })}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      style={{ width: 500 }}
                      name={[field.name, 'percentage']}
                    >
                      <InputNumber placeholder='Enter percentage'></InputNumber>
                    </Form.Item>
                    <Button
                      style={{ right: 400, height: 32, bottom: 12 }}
                      onClick={(e) => {
                        console.log(field)
                        remove(field.name)
                      }}
                    >
                      Remove
                    </Button>
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

export default AddExpenses

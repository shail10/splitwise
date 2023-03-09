import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { ALL_USERS, ADD_EXPENSES } from '../../utils/constant'
import { CATEGORIES } from '../../utils/formConstants'
import initaiState from '../../helper/PopulateInitialState'

import { Button, Form, InputNumber, Select, Input } from 'antd'
import styled from 'styled-components'

function AddExpenses({ history }) {
  const [paidFor, setPaidFor] = useState([])
  const [studentsInvolved, setStudentsInvolved] = useState(initaiState)
  const [availableOptions, setAvailableOptions] = useState([])
  const allUsers = JSON.parse(localStorage.getItem(ALL_USERS))
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const handlePaidFor = (e) => {
    let students = studentsInvolved
    console.log(e)
    students.map((student) => {
      if (!e.includes(student.paidFor)) {
        student.percentage = 0
      }
    })
    console.log(students)
    setStudentsInvolved(students)
  }

  const handlePaidForInput = (e) => {
    let students = studentsInvolved
    students.map((student) => {
      if (student.paidFor === e.target.id) {
        student.percentage = parseInt(e.target.value)
      }
    })
    setStudentsInvolved(students)
  }

  const handleSubmit = async (formValues) => {
    let values = {
      description: formValues.description,
      paidBy: formValues.paidBy,
      categories: formValues.categories,
      amount: formValues.amount,
      students: studentsInvolved,
    }
    try {
      dispatch({
        type: ADD_EXPENSES,
        payload: values,
      })

      history.push('/dashboard')
    } catch (error) {
      alert(error)
    }
    console.log(values)
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
              handlePaidFor(e)
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

        {paidFor.map((student) => {
          return (
            <Form.Item
              key={student.key}
              name={student}
              id={student}
              label={student}
              onChange={(e) => {
                handlePaidForInput(e)
              }}
            >
              <InputNumber placeholder='Contribution'></InputNumber>
            </Form.Item>
          )
        })}

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

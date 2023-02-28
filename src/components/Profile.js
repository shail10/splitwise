import React from 'react'
import { useEffect, useState } from 'react'

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
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(0)
  const [paidBy, setPaidBy] = useState()
  const [paidFor, setPaidFor] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(
    //   `${description} total amount was ${amount} it was paid by ${paidBy} and it was paid for ${paidFor}`
    // )
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
        <Form.Item
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
          }}
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
            placeholder='Please select who paid'
          >
            <Option value='Shail'>Shail</Option>
            <Option value='Tushar'>Tushar</Option>
            <Option value='Sangaja'>Sangaja</Option>
            <Option value='Alok'>Alok</Option>
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
            placeholder='Please select the people involved'
          >
            <Option value='Shail'>Shail</Option>
            <Option value='Tushar'>Tushar</Option>
            <Option value='Sangaja'>Sangaja</Option>
            <Option value='Alok'>Alok</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label='Amount'
          value={amount}
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

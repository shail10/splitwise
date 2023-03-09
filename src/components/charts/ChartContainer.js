import React, { useState } from 'react'
import styled from 'styled-components'

import { useSelector } from 'react-redux'

import { AREA, BAR, PERSONAL_DATA, GROUP_DATA } from '../../utils/constant'

import { GetChart } from '../../helper/GetChart'

import { Form, Select } from 'antd'

const ChartContainer = () => {
  const [chart, setChart] = useState('')
  const [data, setData] = useState('')
  const [form] = Form.useForm()
  const currentUser = useSelector((state) => state.user.user)

  const handleChart = (e) => {
    setChart(e)
  }
  const handleData = (e) => {
    setData(e)
  }

  return (
    <Wrapper>
      <h2>Your expenses</h2>
      <Form form={form} labelCol={{ span: '11' }} wrapperCol={{ span: 3 }}>
        <Form.Item name='user' label='User'>
          <Select
            onSelect={(e) => {
              handleData(e)
            }}
            placeholder='Select a user'
          >
            <Select.Option value={GROUP_DATA}>Group</Select.Option>
            <Select.Option value={PERSONAL_DATA}>
              Individual ({currentUser.username})
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name='chart' label='Chart'>
          <Select
            onSelect={(e) => {
              handleChart(e)
            }}
            placeholder='Select a chart'
          >
            <Select.Option value={BAR}>Bar Chart</Select.Option>
            <Select.Option value={AREA}>Area Chart</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <GetChart chartType={chart} dataType={data} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: white;
  max-width: 80%;
  padding: 1rem;
  margin-left: 10rem;
  border-radius: 1rem;
  box-shadow: 20rem;
  h2 {
    margin-left: 34rem;
    padding: 3rem 2rem 1rem;
  }
  button {
    margin-left: 40rem;
    width: 90px;
    height: 35px;
    border-radius: 10px;
    border: none;
    background: var(--buttonColor);
    color: white;
    font-size: 15px;
    box-shadow: 1px 4px 10px 1px #aaa;
  }
`

export default ChartContainer

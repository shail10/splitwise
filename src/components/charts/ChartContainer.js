import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Form, Select } from 'antd'

import { AREA, BAR, PERSONAL_DATA, GROUP_DATA } from '../../utils/constant'

import AreaChartContainer from './AreaChart'
import BarChartComponent from './BarChart'

import GroupData from './data/GroupData'
import PersonalData from './data/PersonalData'

const ChartContainer = () => {
  const gd = GroupData()
  const pd = PersonalData()
  const [data, setData] = useState(gd)
  const [form] = Form.useForm()
  const currentUser = useSelector((state) => state.user.user)

  const handleData = (e) => {
    if (e === PERSONAL_DATA) setData(pd)
    if (e === GROUP_DATA) setData(gd)
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
      </Form>
      <AreaChartContainer label='Something' data={data} />

      <BarChartComponent data={data} />
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

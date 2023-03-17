import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DatePicker, Form, Button, Select } from 'antd';
import { useSelector } from 'react-redux';

import AreaChartContainer from './AreaChart';
import BarChartComponent from './BarChart';

import { GROUP_DATA, PERSONAL_DATA } from '../../utils/constant';

import GroupData from './DateWiseData/GroupData';
import PersonalData from './DateWiseData/PersonalData';

const Practice = () => {
  const currentUser = useSelector((state) => state.user.user);
  let filteredArray = [];
  const [personaData, setPersonalData] = useState();
  const [groupData, setGroupData] = useState();
  const [data, setData] = useState();
  console.log(data);
  const transactionArray = useSelector((state) => state.transaction.transactions);
  transactionArray.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  const handleData = (e) => {
    if (e === GROUP_DATA) setData(groupData);
    if (e === PERSONAL_DATA) setData(personaData);
  };

  const handleDateChange = (e) => {
    if (e[0] && e[1]) {
      let startDate = new Date(e[0]);
      let endDate = new Date(e[1]);
      for (let i = 0; i < transactionArray.length; i++) {
        if (new Date(transactionArray[i].date) >= startDate) {
          while (i < transactionArray.length && new Date(transactionArray[i].date) <= endDate) {
            filteredArray.push(transactionArray[i]);
            i++;
          }
        }
      }

      setPersonalData(PersonalData(filteredArray, currentUser));
      setGroupData(GroupData(filteredArray));
      filteredArray = [];
    }
  };

  return (
    <Wrapper>
      <Form labelCol={{ span: '11' }} wrapperCol={{ span: 3 }}>
        <Form.Item>
          <DatePicker.RangePicker onCalendarChange={(e) => handleDateChange(e)} />
        </Form.Item>
        <Form.Item name="user" label="User">
          <Select
            onSelect={(e) => {
              handleData(e);
            }}
            placeholder="Select a user"
          >
            <Select.Option value={GROUP_DATA}>Group</Select.Option>
            <Select.Option value={PERSONAL_DATA}>Individual ({currentUser.username})</Select.Option>
          </Select>
        </Form.Item>
        <BarChartComponent data={data} />
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: white;
  max-width: 80%;
  padding: 1rem;
  margin-left: 10rem;
  border-radius: 1rem;
  box-shadow: 20rem;
`;

export default Practice;

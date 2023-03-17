import React, { useState } from 'react';
import styled from 'styled-components';
import { Select, Form, Pagination } from 'antd';

import { useSelector } from 'react-redux';
import SingleTransaction from './transactions/SingleTransaction';

import ProtectedRoute from '../Auth/ProtectedRoute';

import { PERSONAL_DATA, GROUP_DATA } from '../utils/constant';

function Dashboard() {
  const transaction = useSelector((state) => state.transaction);
  const currentUser = useSelector((state) => state.user.user);

  const transactionArray = transaction.transactions || [];
  const [form] = Form.useForm();
  const personlisedTransaction = transactionArray.filter(
    (transact) =>
      transact.paidBy === currentUser.username ||
      transact.students.find((transactPaidFor) => transactPaidFor.paidFor === currentUser.username && transactPaidFor.percentage > 0),
  );
  const [currentData, setCurrentData] = useState(transactionArray);

  const handleChangeData = (e) => {
    if (e === GROUP_DATA) setCurrentData(transactionArray);
    if (e === PERSONAL_DATA) setCurrentData(personlisedTransaction);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const lastIndexOfPage = recordsPerPage * currentPage;
  const firstIndexOfPage = lastIndexOfPage - recordsPerPage;
  const data = currentData.slice(firstIndexOfPage, lastIndexOfPage);

  return (
    <Wrapper>
      <div id="wrapper">
        <Form form={form} labelCol={{ span: '11' }} wrapperCol={{ span: 3 }}>
          <Form.Item name="data" label="Data">
            <Select
              onSelect={(e) => {
                handleChangeData(e);
              }}
              placeholder="Select the data"
            >
              <Select.Option value={GROUP_DATA}>Group</Select.Option>
              <Select.Option value={PERSONAL_DATA}>Individual</Select.Option>
            </Select>
          </Form.Item>
        </Form>
        <h4>Transactions</h4>

        <table id="keywords" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th style={{ maxWidth: 1 }}>
                <span>Description</span>
              </th>
              <th>
                <span>Paid By</span>
              </th>
              <th>
                <span>Amount</span>
              </th>
              <th>
                <span>Category</span>
              </th>
              <th>
                <span>Paid For</span>
              </th>
              <th>
                <span>Date</span>
              </th>
              <th>
                <span>Settle Up</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((transact) => {
              return (
                <tr id={transact.description} key={transact.id}>
                  <SingleTransaction key={transact.id} {...transact} />
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <Pagination
            style={{ marginLeft: '45rem' }}
            onChange={(e) => setCurrentPage(e)}
            defaultCurrent={1}
            pageSize={recordsPerPage}
            total={currentData.length}
          />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.body`
  @import url('https://fonts.googleapis.com/css?family=Amarante');

  h4 {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    outline: none;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .settle {
    margin: 20px auto;
    width: 80px;
    height: 30px;
    border-radius: 10px;
    border: none;
    /* color: #eee; */
    background: var(--buttonColor);
    color: white;
    font-size: 15px;
    box-shadow: 1px 4px 10px 1px #aaa;
  }
  body {
    background: #eee url('https://i.imgur.com/eeQeRmk.png'); /* https://subtlepatterns.com/weave/ */
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 62.5%;
    line-height: 1;
    color: #585858;
    padding: 22px 10px;
    padding-bottom: 55px;
  }

  br {
    display: block;
    line-height: 1.6em;
  }

  .data {
    margin-left: 38rem;
  }

  input,
  textarea {
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  h4 {
    font-family: 'Amarante', Tahoma, sans-serif;
    font-weight: bold;
    font-size: 3em;
    line-height: 1.7em;
    margin-bottom: 1rem;
    text-align: center;
  }

  /** page structure **/
  #wrapper {
    display: block;
    width: 97%;
    background: #fff;
    margin: 0 auto;
    padding: 10px 17px;
    box-shadow: 1px 4px 10px 1px #aaa;
    border-radius: 1rem;
  }

  #keywords {
    margin: 0 auto;
    font-size: 1.2em;
    margin-bottom: 15px;
    width: 98%;
  }

  #keywords thead {
    cursor: pointer;
    background: #c9dff0;
  }
  #keywords thead tr th {
    font-weight: bold;
    padding: 12px 30px;
    padding-left: 42px;
    background: #e5fbf5;
  }
  #keywords thead tr th span {
    padding-right: 20px;
    background-repeat: no-repeat;
    background-position: 100% 100%;
  }

  #keywords thead tr th.headerSortUp,
  #keywords thead tr th.headerSortDown {
    background: #acc8dd;
  }

  #keywords thead tr th.headerSortUp span {
    background-image: url('https://i.imgur.com/SP99ZPJ.png');
  }
  #keywords thead tr th.headerSortDown span {
    background-image: url('https://i.imgur.com/RkA9MBo.png');
  }

  #keywords tbody tr {
    color: #555;
  }
  #keywords tbody tr td {
    text-align: center;
    padding: 15px 10px;
  }
  #keywords tbody tr td.lalign {
    text-align: left;
  }
`;

export default ProtectedRoute(Dashboard);

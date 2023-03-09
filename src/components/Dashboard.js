import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Select, Form } from 'antd'

import { useSelector } from 'react-redux'
import SingleTransaction from './transactions/SingleTransaction'

import ProtectedRoute from '../Auth/ProtectedRoute'

import { PERSONAL_DATA, GROUP_DATA } from '../utils/constant'

const Dashboard = ({ history }) => {
  const transaction = useSelector((state) => state.transaction)
  const currentUser = useSelector((state) => state.user.user)

  const transactionArray = transaction.transactions || []
  const [form] = Form.useForm()
  const personlisedTransaction = transactionArray.filter(
    (transact) =>
      transact.paidBy === currentUser.username ||
      transact.students.find(
        (transactPaidFor) =>
          transactPaidFor.paidFor === currentUser.username &&
          transactPaidFor.percentage > 0
      )
  )
  const [currentData, setCurrentData] = useState(transactionArray)

  const handleChangeData = (e) => {
    if (e === GROUP_DATA) setCurrentData(transactionArray)
    if (e === PERSONAL_DATA) setCurrentData(personlisedTransaction)
  }

  return (
    <Wrapper>
      <div id='wrapper'>
        <Form form={form} labelCol={{ span: '11' }} wrapperCol={{ span: 3 }}>
          <Form.Item name='data' label='Data'>
            <Select
              onSelect={(e) => {
                handleChangeData(e)
              }}
              placeholder='Select the data'
            >
              <Select.Option value={GROUP_DATA}>Group</Select.Option>
              <Select.Option value={PERSONAL_DATA}>Individual</Select.Option>
            </Select>
          </Form.Item>
        </Form>
        <h4>Transactions</h4>

        <table id='keywords' cellspacing='0' cellpadding='0'>
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
                <span>Settle Up</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((transact) => {
              return (
                <tr id={transact.description} key={transact.id}>
                  <SingleTransaction key={transact.id} {...transact} />
                  <td>
                    <Button
                      type='button'
                      onClick={(e) => {
                        console.log(e.target.offsetParent)
                      }}
                    >
                      Settle
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.body`
  @import url('https://fonts.googleapis.com/css?family=Amarante');

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
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
  html {
    overflow-y: scroll;
  }

  button {
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

  ::selection {
    background: #5f74a0;
    color: #fff;
  }
  ::-moz-selection {
    background: #5f74a0;
    color: #fff;
  }
  ::-webkit-selection {
    background: #5f74a0;
    color: #fff;
  }

  br {
    display: block;
    line-height: 1.6em;
  }

  .data {
    margin-left: 38rem;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  ol,
  ul {
    list-style: none;
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

  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  strong,
  b {
    font-weight: bold;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  img {
    border: 0;
    max-width: 100%;
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
    width: 80%;
    background: #fff;
    margin: 0 auto;
    padding: 10px 17px;
    -webkit-box-shadow: 2px 2px 3px -1px rgba(0, 0, 0, 0.35);
  }

  #keywords {
    margin: 0 auto;
    font-size: 1.2em;
    margin-bottom: 15px;
    width: 90%;
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
`

export default ProtectedRoute(Dashboard)

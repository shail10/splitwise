import React from 'react'
import styled from 'styled-components'
import { Divider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { CURRENT_USER, ALL_USERS } from '../utils/constant'

const YourExpenses = () => {
  const allTransaction = useSelector((state) => state.transaction.transactions)
  const currentUser = useSelector((state) => state.user.user)
  const personlisedTransaction = allTransaction.filter(
    (transact) =>
      transact.paidBy === currentUser.username ||
      transact.paidFor.find(
        (transactPaidFor) => transactPaidFor === currentUser.username
      )
  )
  const userExpenses = {}
  JSON.parse(localStorage.getItem(ALL_USERS)).forEach((element) => {
    userExpenses[element.username] = 0
  })

  personlisedTransaction.forEach((transact) => {
    let individualAmount = transact.amount / transact.paidFor.length
    if (transact.paidBy === currentUser.username) {
      transact.paidFor.map(
        (paidForTransact) => (userExpenses[paidForTransact] += individualAmount)
      )
    } else {
      userExpenses[transact.paidBy] -= individualAmount
    }
  })
  const entries = Object.entries(userExpenses)
  // console.log(entries)
  // console.log(userExpenses)

  return (
    <>
      <Wrapper>
        {/* {Object.keys(userExpenses).forEach((key) => {
          if (userExpenses[key] < 0 && key != currentUser.username) {
            return (
              <p>
                `${currentUser.username} owes ${key} ${userExpenses[key]}`
              </p>
            )
          }
          if (userExpenses[key] > 0 && key != currentUser.username) {
            return (
              <p>
                `${key} owes {currentUser.username} ${userExpenses[key]}`
              </p>
            )
          }
        })} */}
        {Object.entries(userExpenses).map((user) => {
          if (user[1] < 0 && user[0] != currentUser.username) {
            return (
              <>
                <p>
                  <b>You</b> owes <b>{Math.abs(user[1])}</b> to
                  <b>{user[0]}</b>.
                </p>
                <Divider dashed />
              </>
            )
          }
          if (user[1] > 0 && user[0] != currentUser.username) {
            return (
              <>
                <p>
                  <b>{user[0]}</b> owes <b>{Math.abs(user[1])}</b> to <b>you</b>
                  .
                </p>
                <Divider dashed />
              </>
            )
          }
        })}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  background: white;
  max-width: 40%;
  padding: 1rem;
  margin-left: 30rem;
  border-radius: 2rem;
  box-shadow: 20rem;

  p {
    margin: 2rem;
    font-size: 1.5rem;
  }
`

export default YourExpenses

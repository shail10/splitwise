import React from 'react'
import styled from 'styled-components'
import { Divider } from 'antd'
import { useSelector } from 'react-redux'

import { CalculateExpenses } from '../../helper/CalculateExpenses'

import { CURRENT_USER, ALL_USERS } from '../../utils/constant'

const YourExpenses = () => {
  const userExpenses = CalculateExpenses()
  const currentUser = useSelector((state) => state.user.user)
  let totalOwed = 0
  for (const keys in userExpenses) {
    totalOwed += userExpenses[keys]
  }
  const result = []

  {
    Object.keys(userExpenses).forEach((key) => {
      if (userExpenses[key] < 0 && key != currentUser.username) {
        result.push(
          <p>
            {currentUser.username} owes {key}{' '}
            {Math.round(Math.abs(userExpenses[key]))}
            <Divider dashed />
          </p>
        )
      }
      if (userExpenses[key] > 0 && key != currentUser.username) {
        result.push(
          <p>
            {key} owes {currentUser.username} {Math.round(userExpenses[key])}
            <Divider dashed />
          </p>
        )
      }
    })
  }
  result.push(
    <>
      <span class='totalExpense'>
        Your total expenses is
        <i>
          <b> {userExpenses[currentUser.username]}</b>
        </i>
      </span>
      <span class='totalOwed'>
        You are owed
        <i>
          <b> {totalOwed - userExpenses[currentUser.username]}</b>
        </i>
      </span>
    </>
  )

  return <Wrapper>{result}</Wrapper>
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
  .totalExpense {
    margin: 0.5em 2em 3em 4em;
  }
  .totalOwed {
    margin: 0.5em 2em 3em 6em;
  }
  span {
    padding: 0.5em;
    border: dotted;
  }
`

export default YourExpenses

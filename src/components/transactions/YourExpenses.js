import React from 'react'
import styled from 'styled-components'
import { Divider } from 'antd'
import { useSelector } from 'react-redux'

import { CalculateExpenses } from '../../helper/CalculateExpenses'

import { CURRENT_USER, ALL_USERS } from '../../utils/constant'

const YourExpenses = () => {
  const userExpenses = CalculateExpenses()
  const currentUser = useSelector((state) => state.user.user)

  const result = []

  {
    Object.keys(userExpenses).forEach((key) => {
      console.log(key)
      if (userExpenses[key] < 0 && key != currentUser.username) {
        console.log(currentUser.username)
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
`

export default YourExpenses

import React from 'react'
import { ALL_USERS } from '../utils/constant'

const allUsers = JSON.parse(localStorage.getItem(ALL_USERS))

let initaiState = []

allUsers.map((user) => {
  initaiState.push({ paidFor: user.username, percentage: 0 })
})

export default initaiState

import React from 'react'
import { useSelector } from 'react-redux'
import { ALL_USERS } from '../utils/constant'

export const CalculateExpenses = () => {
  const allTransaction = useSelector((state) => state.transaction.transactions)
  const currentUser = useSelector((state) => state.user.user)
  const personlisedTransaction = allTransaction.filter(
    (transact) =>
      transact.paidBy === currentUser.username ||
      transact.students.find(
        (transactPaidFor) => transactPaidFor.paidFor === currentUser.username
      )
  )
  const userExpenses = {}
  JSON.parse(localStorage.getItem(ALL_USERS)).forEach((element) => {
    userExpenses[element.username] = 0
  })

  personlisedTransaction.forEach((transact) => {
    // let individualAmount = transact.amount / transact.paidFor.length
    if (transact.paidBy === currentUser.username) {
      transact.students.map(
        (transactPaidFor) =>
          (userExpenses[transactPaidFor.paidFor] +=
            transact.amount * (transactPaidFor.percentage / 100))
      )
    } else {
      // userExpenses[transact.paidBy] -= individualAmount
      transact.students.map((transactPaidFor) => {
        if (transactPaidFor.paidFor === currentUser.username) {
          userExpenses[transact.paidBy] -=
            transact.amount * (transactPaidFor.percentage / 100)
        }
      })
    }
  })
  return userExpenses
}

import { useSelector } from 'react-redux'
import { CATEGORIES } from '../../../utils/formConstants'

export const PersonalData = () => {
  const allTransaction = useSelector((state) => state.transaction.transactions)
  const currentUser = useSelector((state) => state.user.user)

  const personlisedTransaction = allTransaction.filter((transact) =>
    transact.students.find(
      (transactPaidFor) => transactPaidFor.paidFor === currentUser.username
    )
  )

  const groupData = []
  CATEGORIES.map((category) => {
    groupData.push({ category: category, amount: 0 })
  })

  personlisedTransaction.map((transact) => {
    let category = transact.categories
    let totalAmount = transact.amount
    let amount
    transact.students.map((transactPaidFor) => {
      if (transactPaidFor.paidFor === currentUser.username) {
        amount = transactPaidFor.percentage / 100
        amount = totalAmount * amount
        amount = Math.round(amount)
      }
    })
    groupData.map((data) => {
      if (data.category === category) {
        data.amount += amount
      }
    })
  })

  return groupData
}

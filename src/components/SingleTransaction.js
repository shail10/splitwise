import React from 'react'
const SingleTransaction = (props) => {
  return (
    <tr>
      <td class='lalign'>{props.description}</td>
      <td>{props.paidBy}</td>
      <td>{props.amount}</td>
      <td>
        {props.paidFor.map((user) => {
          return <div>{user}</div>
        })}
        {/* temp */}
      </td>
    </tr>
  )
}

export default SingleTransaction

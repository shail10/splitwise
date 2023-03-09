import { Input, Divider, Button } from 'antd'
import React from 'react'
import { PEOPLE_INVOLVED } from '../../utils/formConstants'
const SingleTransaction = (props) => {
  return (
    <>
      <td>
        <Input
          placeholder={props.description}
          value={props.description}
          onChange={(e) => {
            console.log(e)
          }}
        ></Input>
      </td>
      <td>
        <Input placeholder={props.paidBy} value={props.paidBy}></Input>
      </td>
      <td>
        <Input placeholder={props.amount} value={props.amount}></Input>
      </td>
      <td>
        <Input placeholder={props.categories} value={props.categories}></Input>
      </td>
      <td>
        {props.students.map((student) => {
          return (
            <div key={student.id}>
              {/* <div>
                {student.paidFor} - {student.percentage}%
              </div> */}
              {student.percentage > 0 && (
                <>
                  <div>
                    {student.paidFor} - {student.percentage}%
                  </div>
                </>
              )}
            </div>
          )
        })}
      </td>
    </>
  )
}

export default SingleTransaction

import { Input } from 'antd';
import React from 'react';
const SingleTransaction = (props) => {
  const date = new Date(props.date);

  return (
    <>
      <td>
        <Input
          placeholder={props.description}
          value={props.description}
          onChange={(e) => {
            console.log(e);
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
              {student.percentage > 0 && (
                <>
                  <div style={{ fontSize: '1rem' }}>
                    {student.paidFor} - {student.percentage}% ({Math.abs((props.amount * student.percentage) / 100)})
                  </div>
                </>
              )}
            </div>
          );
        })}
      </td>
      <td>
        <div>
          {date.getFullYear()}-{date.getMonth()}-{date.getDate()}
        </div>
      </td>
      <td id="abc">
        <button
          className="settle"
          type="button"
          onClick={(e) => {
            console.log(e);
          }}
        >
          Settle
        </button>
      </td>
    </>
  );
};

export default SingleTransaction;

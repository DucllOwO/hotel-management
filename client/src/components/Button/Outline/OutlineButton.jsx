import React from 'react'
import "./outlinebutton.css"
import "../../../constant/main.css"


const OutlineButton = (props) => {
  console.log(props.icon)
  return (
    <div className='outlineButton'>
      <div className="title">{props.title}</div>
    </div>
  )
}

export default OutlineButton

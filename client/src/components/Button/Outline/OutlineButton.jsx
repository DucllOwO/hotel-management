import React from 'react'
import "./outlinebutton.css"
import "../../../constant/main.css"


const OutlineButton = (props) => {
  return (
    <div className='outlineButton'>
      <div className="title">{props.title}</div>
    </div>
  )
}

export default OutlineButton

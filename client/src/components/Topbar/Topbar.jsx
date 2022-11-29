import React from 'react'
import '../../constant/main.css'
import './Topbar.css'

const Topbar = (props) => {
  return (
    <div className='topbar'>
        <img src={props.img} alt="" className='avatar'/>
        <div className="information">
            <div className="name">{props.name}</div>
            <div className="position">{props.position}</div>
        </div>
    </div>
  )
}

export default Topbar
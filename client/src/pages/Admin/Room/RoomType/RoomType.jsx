import React from 'react'
import Topbar from '../../../../components/Topbar/Topbar'
import RoomTypeTable from '../../Tables/RoomType/RoomTypeTable'
import "./roomtype.css"

const RoomType = () => {
  return (
    <div className='container'>
      <div className="roomTypeContainer">
        <div>RoomType</div>
        <RoomTypeTable></RoomTypeTable>
      </div>
    </div>
  )
}

export default RoomType
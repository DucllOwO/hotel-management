import React from 'react'
import Topbar from '../../../../components/Topbar/Topbar'
import RoomTypeTable from '../../Tables/RoomType/RoomTypeTable'
import "./roomtype.css"

const RoomType = () => {
  return (
    <div className='container'>
      <div className="roomTypeContainer">
        <Topbar name="Huỳnh Thế Vĩ" img="https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199880924/Boba-Stitch_800x800_SEPS-1000x1000.jpg" position="Manager"></Topbar>
        <div>RoomType</div>
        <RoomTypeTable></RoomTypeTable>
      </div>
    </div>
  )
}

export default RoomType
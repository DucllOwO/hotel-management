import React from 'react'
import RoomsTable from '../../Tables/Rooms/RoomsTable'
import Topbar from '../../../../components/Topbar/Topbar'
import "./rooms.css"

const Rooms = () => {
  return (
    <div className='container'>
      <div className="roomsContainer">
        <Topbar name="Huỳnh Thế Vĩ" img="https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199880924/Boba-Stitch_800x800_SEPS-1000x1000.jpg" position="Manager"></Topbar>
        <div>Rooms</div>
        <RoomsTable></RoomsTable>
      </div>
    </div>
  )
}

export default Rooms
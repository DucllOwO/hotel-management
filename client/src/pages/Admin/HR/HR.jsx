import React from 'react'
import Topbar from '../../../components/Topbar/Topbar'
import "./hr.css"
import HRTable from '../Tables/HR/HRTable'

const HR = () => {
  return (
    <div className='container'>
      <div className="hrContainer">
        <Topbar name="Huỳnh Thế Vĩ" img="https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199880924/Boba-Stitch_800x800_SEPS-1000x1000.jpg" position="Manager"></Topbar>
        <HRTable></HRTable>
      </div>
    </div>
  )
}

export default HR
import React from 'react'
import DataTable from '../../../components/Table/DataTable'
import Topbar from '../../../components/Topbar/Topbar'
import Navbar from '../../../components/Admin/Navbar/Navbar'
import "./hr.css"

const HR = () => {
  return (
    <div className='container'>
      <Navbar className="navbar"></Navbar>
      <div className="hrContainer">
        <Topbar name="Huỳnh Thế Vĩ" img="https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199880924/Boba-Stitch_800x800_SEPS-1000x1000.jpg" position="Manager"></Topbar>
        <div>HR</div>
        <DataTable></DataTable>
      </div>
    </div>
  )
}

export default HR
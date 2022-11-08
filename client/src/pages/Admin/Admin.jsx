import React from 'react'
import "./admin.css"
import Navbar from '../../components/Admin/Navbar/Navbar'
import DataTable from '../../components/Table/DataTable'
import OutlineButton from '../../components/Button/Outline/OutlineButton'

const Admin = () => {
  return (
    <div className='container'>
      {/* <Navbar></Navbar>
      <OutlineButton></OutlineButton> */}
      <DataTable></DataTable>
    </div>
  )
}

export default Admin
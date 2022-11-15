import React from 'react'
import "./admin.css"
import Navbar from '../../components/Admin/Navbar/Navbar'
import HR from './HR/HR'
import Topbar from '../../components/Topbar/Topbar'
import DataTable from '../../components/Table/DataTable'
import OutlineButton from '../../components/Button/Outline/OutlineButton'
import StaffNavbar from '../../components/Staff/Navbar/Navbar'
import Content from './Content/Content'

const Admin = () => {
  return (
    <div className='container'>
      <Navbar className="navbar"></Navbar>
      <div className="homeContainer">
        <Content/>
      </div>
      {/* <OutlineButton></OutlineButton> */}
      {/* <StaffNavbar></StaffNavbar> */}
    </div>
  )
}

export default Admin
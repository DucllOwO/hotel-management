import React from 'react'
import {Menu} from "antd"
import "./navbar.css"
import "../../../constant/main.css"

const StaffNavbar = () => {
  return (
    <div className='navbar'>
        <div className="left">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/2560px-Booking.com_logo.svg.png" alt="" className='logo' />
            <Menu
                className='menu'
                items={[
                    {label: "Customer", key: "customer"},
                    {label: "Rooms", key: "room"},
                    {label: "Booking", key: "booking"},
                    {label: "Promotions", key: "promotions"},
                ]}
            >
            </Menu>
        </div>
    </div>
  )
}

export default StaffNavbar
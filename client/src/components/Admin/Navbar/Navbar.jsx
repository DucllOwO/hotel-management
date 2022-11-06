import React from 'react'
import "./navbar.css"


const Navbar = () => {
  return (
    <div className='navBar'>
        <div className="logoContainer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/2560px-Booking.com_logo.svg.png" alt="" className="logo"/>
        </div>
        <div className="body">
          <div className="body-item">
            <span className='item'>HR</span>
          </div>
          <div className="body-item">
            <span className='item'>Account</span>
          </div>
          <div className="body-item">
            <span className='item'>Room</span>
          </div>
          <div className="body-item">
            <span className='item'>Depot</span>
          </div>
          <div className="body-item">
            <span className='item'>Turnover</span>
          </div>
          <div className="body-item">
            <span className='item'>Report</span>
          </div>
        </div>
        <div className="footer">
        <span className='item'>Log out</span>
        </div>
    </div>
  )
}

export default Navbar
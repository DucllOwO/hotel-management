import React from 'react';
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup, 
  faUserCheck, 
  faDoorClosed, 
  faMoneyBillTransfer,
  faWarehouse,
  faChartPie,
  faArrowRightToBracket
} 
from "@fortawesome/free-solid-svg-icons";


const Navbar = () => {
  return (
    <div className='navBar'>
        <div className="logoContainer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/2560px-Booking.com_logo.svg.png" alt="" className="logo"/>
        </div>
        <div className="body">
          <div className="body-item">
            <FontAwesomeIcon icon={faUserGroup}></FontAwesomeIcon>
            <span className='item'>HR</span>
          </div>
          <div className="body-item">
            <FontAwesomeIcon icon={faUserCheck}></FontAwesomeIcon>
            <span className='item'>Account</span>
          </div>
          <div className="body-item">
            <FontAwesomeIcon icon={faDoorClosed}></FontAwesomeIcon>
            <span className='item'>Room</span>
          </div>
          <div className="body-item">
            <FontAwesomeIcon icon={faWarehouse} className="icon"></FontAwesomeIcon>
            <span className='item'>Depot</span>
          </div>
          <div className="body-item">
            <FontAwesomeIcon icon={faMoneyBillTransfer} className="icon"></FontAwesomeIcon>
            <span className='item'>Turnover</span>
          </div>
          <div className="body-item">
            <FontAwesomeIcon icon={faChartPie} className="icon"></FontAwesomeIcon>
            <span className='item'>Report</span>
          </div>
        </div>
        <div className="footer">
          <FontAwesomeIcon icon={faArrowRightToBracket} className="icon"></FontAwesomeIcon>
          <span className='item'>Log out</span>
        </div>
    </div>
  )
}

export default Navbar
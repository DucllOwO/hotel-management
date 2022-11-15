import React, { useState } from 'react';
import "../../../components/Admin/Navbar/navbar.css";
import {Menu, Space} from 'antd'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import {
  TeamOutlined,
  FileProtectOutlined,
  CopyOutlined,
  DatabaseOutlined,
  PieChartOutlined,
  LineChartOutlined,
  LogoutOutlined
} 
from "@ant-design/icons";


const Navbar = () => {
  const navigate = useNavigate()

  const [current, setCurrent] = useState('/admin');

  const onClickHandler = (e) => {
    if(e.key === "logout"){
      
    } 
    else {
      setCurrent(e.key);
      navigate(e.key)
    }
  };

  return (
    <div className='navBar'>
      <img src="https://1000logos.net/wp-content/uploads/2021/05/Booking.Com-logo.png" alt="" className='logo'/>
      <Menu
        // onClick={({key}) => {
        //   if(key==="logout"){

        //   }
        //   else {
        //     navigate(key)
        //   }
        // }}
        className='menu'
        mode='inline'
        theme='light'
        defaultSelectedKeys={['/admin']}
        selectedKeys={[current]}
        onClick={onClickHandler}
        items={[
          {label: "Dashboard", key: "/admin", icon: <LineChartOutlined></LineChartOutlined>,},
          {label: "HR", key: "/admin/hr", icon: <TeamOutlined></TeamOutlined>},
          {label: "Account", key: "/admin/account", icon: <FileProtectOutlined></FileProtectOutlined>},
          {
            label: "Room", 
            key: "/admin/rooms", 
            icon: <CopyOutlined></CopyOutlined>,
            children: [
              {label: "Room Type", key:"/admin/roomType"},
              {label: "Rooms", key:"/admin/rooms"},
              {label: "Utilities", key:"/admin/utilities"},
            ]
          },
          {
            label: "Depot", 
            key: "/admin/inventory", 
            icon: <DatabaseOutlined></DatabaseOutlined>,
            children: [
              {label: "Inventory", key:"/admin/inventory"},
              {label: "Importing", key:"/admin/importing"},
              {label: "Item", key:"/admin/item"},
            ]
          },
          {
            label: "Turnover", 
            key: "/admin/reciept", 
            icon: <PieChartOutlined></PieChartOutlined>,
            children: [
              {label: "Reciept", key:"/admin/reciept"},
              {label: "Payment", key:"/admin/payment"},
            ]
          },
          {label: "Log out", key: "logout", icon: <LogoutOutlined></LogoutOutlined>},
        ]}
      >
      </Menu>
        {/* <div className="logoContainer">
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
        </div> */}
    </div>
  )
}

export default Navbar
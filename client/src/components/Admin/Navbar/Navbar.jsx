import React from 'react';
import "../../../components/Admin/Navbar/navbar.css";
import {Menu, Space} from 'antd'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  return (
    <div className='navBar'>
      <img src="https://1000logos.net/wp-content/uploads/2021/05/Booking.Com-logo.png" alt="" className='logo'/>
      <Menu
                className='menu'
                mode='inline'
                theme='light'
                items={[
                    {label: "HR", key: "hr", icon: <TeamOutlined></TeamOutlined>},
                    {label: "Account", key: "account", icon: <FileProtectOutlined></FileProtectOutlined>},
                    {
                      label: "Room", 
                      key: "booking", 
                      icon: <CopyOutlined></CopyOutlined>,
                      children: [
                        {label: "Room Type", key:"roomType"},
                        {label: "Rooms", key:"rooms"},
                        {label: "Utilities", key:"utilities"},
                      ]
                    },
                    {
                      label: "Depot", 
                      key: "depot", 
                      icon: <DatabaseOutlined></DatabaseOutlined>,
                      children: [
                        {label: "Inventory", key:"inventory"},
                        {label: "Importing", key:"importing"},
                        {label: "Items", key:"items"},
                      ]
                    },
                    {
                      label: "Turnover", 
                      key: "turnover", 
                      icon: <PieChartOutlined></PieChartOutlined>,
                      children: [
                        {label: "Reciepts", key:"reciepts"},
                        {label: "Payments", key:"payments"},
                      ]
                    },
                    {label: "Report", key: "report", icon: <LineChartOutlined></LineChartOutlined>},
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
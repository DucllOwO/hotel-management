import React, { useState } from "react";
import "../../../components/Staff/Navbar/navbar.css";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserSwitchOutlined,
  DiffOutlined,
  AuditOutlined,
} from "@ant-design/icons";

const StaffNavbar = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState("/staff");

  const onClickHandler = (e) => {
    if (e.key === "logout") {
    } else {
      setCurrent(e.key);
      navigate(e.key);
    }
  };

  return (
    <div className="navBar">
      <img
        src="https://1000logos.net/wp-content/uploads/2021/05/Booking.Com-logo.png"
        alt=""
        className="logo"
      />
      <Menu
        className="menu"
        mode="inline"
        theme="light"
        defaultSelectedKeys={["/staff"]}
        selectedKeys={[current]}
        onClick={onClickHandler}
        items={[
          {
            label: "Customer",
            key: "/staff/customer",
            icon: <UserSwitchOutlined></UserSwitchOutlined>,
          },
          {
            label: "Booking",
            key: "/staff/booking",
            icon: <DiffOutlined></DiffOutlined>,
          },
          {
            label: "Receipt",
            key: "/staff/receipt",
            icon: <AuditOutlined></AuditOutlined>,
          },
        ]}
      ></Menu>
    </div>
  );
};

export default StaffNavbar;

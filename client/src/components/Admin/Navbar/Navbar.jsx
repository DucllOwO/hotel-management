import React, { useState } from "react";
import "../../../components/Admin/Navbar/navbar.css";
import { Menu, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  TeamOutlined,
  FileProtectOutlined,
  CopyOutlined,
  DatabaseOutlined,
  PieChartOutlined,
  LineChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState("/admin");

  const onClickHandler = (e) => {
    if (e.key === "logout") {
      navigate(e.key);
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
        // onClick={({key}) => {
        //   if(key==="logout"){

        //   }
        //   else {
        //     navigate(key)
        //   }
        // }}
        className="menu"
        mode="inline"
        theme="light"
        defaultSelectedKeys={["/admin"]}
        selectedKeys={[current]}
        onClick={onClickHandler}
        items={[
          {
            label: "Dashboard",
            key: "/admin/dashboard",
            icon: <LineChartOutlined></LineChartOutlined>,
          },
          {
            label: "HR",
            key: "/admin/hr",
            icon: <TeamOutlined></TeamOutlined>,
          },
          {
            label: "Account",
            key: "/admin/account",
            icon: <FileProtectOutlined></FileProtectOutlined>,
          },
          {
            label: "Room",
            key: "/admin/rooms",
            icon: <CopyOutlined></CopyOutlined>,
            children: [
              { label: "Room Type", key: "/admin/roomType" },
              { label: "Rooms", key: "/admin/rooms" },
              { label: "Utilities", key: "/admin/utilities" },
            ],
          },
          {
            label: "Depot",
            key: "/admin/inventory",
            icon: <DatabaseOutlined></DatabaseOutlined>,
            children: [
              { label: "Inventory", key: "/admin/inventory" },
              { label: "Importing", key: "/admin/importing" },
              { label: "Item", key: "/admin/item" },
            ],
          },
          {
            label: "Turnover",
            key: "/admin/reciept",
            icon: <PieChartOutlined></PieChartOutlined>,
            children: [
              { label: "Receipt", key: "/admin/reciept" },
              { label: "Payment", key: "/admin/payment" },
            ],
          },
          {
            label: "Log out",
            key: "/login",
            icon: <LogoutOutlined></LogoutOutlined>,
          },
        ]}
      ></Menu>
    </div>
  );
};

export default Navbar;

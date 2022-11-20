import React, { useState, useContext } from "react";
import "../../../components/Admin/Navbar/navbar.css";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  TeamOutlined,
  FileProtectOutlined,
  CopyOutlined,
  DatabaseOutlined,
  PieChartOutlined,
  LineChartOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import LocalStorage from "../../../Utils/localStorage";
import { AppContext } from "../../../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [current, setCurrent] = useState("/admin");

  const onClickHandler = (e) => {
    if (e.key === "logout") {
      LocalStorage.deleteItem("user");
      setUser(null);
      navigate("/");
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
            key: "/admin/receipt",
            icon: <PieChartOutlined></PieChartOutlined>,
            children: [
              { label: "Receipt", key: "/admin/receipt" },
              { label: "Payment", key: "/admin/payment" },
            ],
          },
          {
            label: "Position",
            key: "/admin/position",
            icon: <UserOutlined />,
          },
          {
            label: "Log out",
            key: "logout",
            icon: <LogoutOutlined></LogoutOutlined>,
          },
        ]}
      ></Menu>
    </div>
  );
};

export default Navbar;

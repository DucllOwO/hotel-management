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
  UserSwitchOutlined,
  AuditOutlined,
  DiffOutlined,
} from "@ant-design/icons";
import LocalStorage from "../../../Utils/localStorage";
import { AppContext } from "../../../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [current, setCurrent] = useState("/admin");

  const onClickHandler = (e) => {
    // logout == /login
    if (e.key === "/login") {
      console.log("log out");
      LocalStorage.deleteItem("user");
      setUser(null);
      navigate("/");
    } else {
      setCurrent(e.key);
      navigate(e.key);
    }
  };
  const permission = LocalStorage.getItem("user")?.permission;

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
        items={permission ? [
          permission.includes("Dashboard")
            ? {
                label: "Dashboard",
                key: "/admin/dashboard",
                icon: <LineChartOutlined></LineChartOutlined>,
              }
            : null,
          permission.includes("Employee")
            ? {
                label: "HR",
                key: "/admin/hr",
                icon: <TeamOutlined></TeamOutlined>,
              }
            : null,
          permission.includes("Account")
            ? {
                label: "Account",
                key: "/admin/account",
                icon: <FileProtectOutlined></FileProtectOutlined>,
              }
            : null,
          permission.includes("Room") ||
          permission.includes("Room type") ||
          permission.includes("Utilities")
            ? {
                label: "Room",
                key: "/admin/rooms",
                icon: <CopyOutlined></CopyOutlined>,
                children: [
                  permission.includes("Room type")
                    ? { label: "Room Type", key: "/admin/roomType" }
                    : null,
                  permission.includes("Room")
                    ? { label: "Rooms", key: "/admin/rooms" }
                    : null,
                  permission.includes("Utilities")
                    ? { label: "Utilities", key: "/admin/utilities" }
                    : null,
                ],
              }
            : null,
          permission.includes("Inventory") ||
          permission.includes("Import") ||
          permission.includes("Item")
            ? {
                label: "Depot",
                key: "/admin/inventory",
                icon: <DatabaseOutlined></DatabaseOutlined>,
                children: [
                  permission.includes("Inventory")
                    ? { label: "Inventory", key: "/admin/inventory" }
                    : null,
                  permission.includes("Import")
                    ? { label: "Importing", key: "/admin/importing" }
                    : null,
                  permission.includes("Item")
                    ? { label: "Item", key: "/admin/item" }
                    : null,
                ],
              }
            : null,
          permission.includes("Receipt") || 
          permission.includes("Payment")
            ? {
                label: "Turnover",
                key: "/admin/receipt",
                icon: <PieChartOutlined></PieChartOutlined>,
                children: [
                  permission.includes("Receipt")
                    ? { label: "Receipt", key: "/admin/receipt" }
                    : null,
                  permission.includes("Payment")
                    ? { label: "Payment", key: "/admin/payment" }
                    : null,
                ],
              }
            : null,
          permission.includes("Position")
            ? {
                label: "Position",
                key: "/admin/position",
                icon: <UserOutlined />,
              }
            : null,
          permission.includes("Customer")
            ? {
                label: "Customer",
                key: "/admin/customer",
                icon: <UserSwitchOutlined></UserSwitchOutlined>,
              }
            : null,
          permission.includes("Booking")
            ? {
                label: "Booking",
                key: "/admin/bookings",
                icon: <DiffOutlined></DiffOutlined>,
                children: [
                    { label: "Booking", key: "/admin/bookings/" },
                    { label: "Booking List", key: "/admin/bookings/list" }
                ],
              }
            : null,
          {
            label: "Log out",
            key: "/login",
            icon: <LogoutOutlined></LogoutOutlined>,
          },
        ] : null}
      ></Menu>
    </div>
  );
};

export default Navbar;

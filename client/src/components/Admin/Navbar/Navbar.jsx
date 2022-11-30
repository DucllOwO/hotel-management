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
  DiffOutlined,
  GiftOutlined,
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
      if (e.key.includes("/child")) {
        setCurrent(e.key.replace("/child", ""));
        navigate(e.key.replace("/child", ""));
      } else {
        setCurrent(e.key);
        navigate(e.key);
      }
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
                label: "Thống kê",
                key: "/admin/dashboard",
                icon: <LineChartOutlined></LineChartOutlined>,
              }
            : null,
          permission.includes("Employee")
            ? {
                label: "Nhân sự",
                key: "/admin/hr",
                icon: <TeamOutlined></TeamOutlined>,
              }
            : null,
          permission.includes("Account")
            ? {
                label: "Tài khoản",
                key: "/admin/account",
                icon: <FileProtectOutlined></FileProtectOutlined>,
              }
            : null,
          permission.includes("Room") ||
          permission.includes("Room type") ||
          permission.includes("Utilities")
            ? {
                label: "Phòng",
                key: "/admin/rooms",
                icon: <CopyOutlined></CopyOutlined>,
                children: [
                  permission.includes("Room type")
                    ? { label: "Loại phòng", key: "/admin/roomType" }
                    : null,
                  permission.includes("Room")
                    ? { label: "Danh mục phòng", key: "/admin/rooms" }
                    : null,
                  permission.includes("Utilities")
                    ? { label: "Tiện ích", key: "/admin/utilities" }
                    : null,
                ],
              }
            : null,
          permission.includes("Inventory") ||
          permission.includes("Import") ||
          permission.includes("Item")
            ? {
                label: "Kho",
                key: "/admin/inventory",
                icon: <DatabaseOutlined></DatabaseOutlined>,
                children: [
                  permission.includes("Inventory")
                    ? { label: "Kiểm tra phòng", key: "/admin/inventory" }
                    : null,
                  permission.includes("Import")
                    ? { label: "Nhập sản phẩm", key: "/admin/importing" }
                    : null,
                  permission.includes("Item")
                    ? { label: "Quản lý sản phẩm", key: "/admin/item" }
                    : null,
                ],
              }
            : null,
          permission.includes("Receipt") || 
          permission.includes("Payment")
            ? {
                label: "Doanh số",
                key: "/admin/receipt",
                icon: <PieChartOutlined></PieChartOutlined>,
                children: [
                  permission.includes("Receipt")
                    ? { label: "Hoá đơn", key: "/admin/receipt" }
                    : null,
                  permission.includes("Payment")
                    ? { label: "Phiếu chi", key: "/admin/payment" }
                    : null,
                ],
              }
            : null,
          permission.includes("Position")
            ? {
                label: "Chức vụ",
                key: "/admin/position",
                icon: <UserOutlined />,
              }
            : null,
          permission.includes("Customer")
            ? {
                label: "Khách hàng",
                key: "/admin/customer",
                icon: <UserSwitchOutlined></UserSwitchOutlined>,
              }
            : null,
          permission.includes("Booking")
            ? {
                label: "Đặt phòng",
                key: "/admin/bookings",
                icon: <DiffOutlined></DiffOutlined>,
                children: [
                    { label: "Đặt phòng", key: "/admin/bookings/" },
                    { label: "Danh sách phiếu đặt phòng", key: "/admin/bookings/list" }
                ],
              }
            : null,
          {
            label: "Đăng xuất",
            key: "/login",
            icon: <LogoutOutlined></LogoutOutlined>,
          },
        ] : null}
      ></Menu>
    </div>
  );
};

export default Navbar;

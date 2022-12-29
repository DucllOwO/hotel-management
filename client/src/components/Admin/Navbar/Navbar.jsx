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
import NavBarLogo from "../../../assets/images/LogoWhite.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [current, setCurrent] = useState("/admin/dashboard");

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
      <img src={NavBarLogo} alt="" className="logo" />
      <Menu
        className="menu"
        mode="inline"
        theme="dark"
        // defaultSelectedKeys={["/admin/dashboard"]}
        defaultSelectedKeys={[window.location.pathname]}
        selectedKeys={[window.location.pathname]}
        onClick={onClickHandler}
        items={
          permission
            ? [
                permission.includes("Thống kê")
                  ? {
                      label: "Thống kê",
                      key: "/admin/dashboard",
                      icon: <LineChartOutlined></LineChartOutlined>,
                    }
                  : null,
                permission.includes("Đặt phòng")
                  ? {
                      label: "Đặt phòng",
                      key: "/admin/bookings",
                      icon: <DiffOutlined></DiffOutlined>,
                      children: [
                        {
                          label: "Đặt phòng",
                          key: "/admin/bookings/",
                        },
                        {
                          label: "Danh sách đặt phòng",
                          key: "/admin/bookings/list",
                        },
                      ],
                    }
                  : null,
                permission.includes("Danh mục phòng") ||
                permission.includes("Loại phòng") ||
                permission.includes("Tiện ích")
                  ? {
                      label: "Phòng",
                      key: "/admin/rooms",
                      icon: <CopyOutlined></CopyOutlined>,
                      children: [
                        permission.includes("Loại phòng")
                          ? { label: "Loại phòng", key: "/admin/roomType" }
                          : null,
                        permission.includes("Danh mục phòng")
                          ? { label: "Danh mục phòng", key: "/admin/rooms" }
                          : null,
                        permission.includes("Tiện ích")
                          ? { label: "Tiện ích", key: "/admin/utilities" }
                          : null,
                      ],
                    }
                  : null,
                permission.includes("Nhân sự")
                  ? {
                      label: "Nhân sự",
                      key: "/admin/hr",
                      icon: <TeamOutlined></TeamOutlined>,
                    }
                  : null,
                permission.includes("Tài khoản")
                  ? {
                      label: "Tài khoản",
                      key: "/admin/account",
                      icon: <FileProtectOutlined></FileProtectOutlined>,
                    }
                  : null,
                permission.includes("Khách hàng")
                  ? {
                      label: "Khách hàng",
                      key: "/admin/customer",
                      icon: <UserSwitchOutlined></UserSwitchOutlined>,
                    }
                  : null,
                permission.includes("Hóa đơn") ||
                permission.includes("Phiếu chi")
                  ? {
                      label: "Doanh số",
                      key: "/admin/receipt",
                      icon: <PieChartOutlined></PieChartOutlined>,
                      children: [
                        permission.includes("Hóa đơn")
                          ? { label: "Hoá đơn", key: "/admin/receipt" }
                          : null,
                        permission.includes("Phiếu chi")
                          ? { label: "Phiếu chi", key: "/admin/payment" }
                          : null,
                      ],
                    }
                  : null,
                permission.includes("Kiểm tra phòng") ||
                permission.includes("Nhập sản phẩm") ||
                permission.includes("Quản lý sản phẩm")
                  ? {
                      label: "Kho",
                      key: "/admin/inventory",
                      icon: <DatabaseOutlined></DatabaseOutlined>,
                      children: [
                        permission.includes("Kiểm tra phòng")
                          ? { label: "Kiểm tra phòng", key: "/admin/inventory" }
                          : null,
                        permission.includes("Nhập sản phẩm")
                          ? { label: "Nhập sản phẩm", key: "/admin/importing" }
                          : null,
                        permission.includes("Quản lý sản phẩm")
                          ? { label: "Quản lý sản phẩm", key: "/admin/items" }
                          : null,
                      ],
                    }
                  : null,
                permission.includes("Phiếu giảm giá")
                  ? {
                      label: "Phiếu giảm giá",
                      key: "/admin/promotion",
                      icon: <DiffOutlined></DiffOutlined>,
                    }
                  : null,
                permission.includes("Chức vụ")
                  ? {
                      label: "Chức vụ",
                      key: "/admin/position",
                      icon: <UserOutlined />,
                    }
                  : null,
                {
                  label: "Đăng xuất",
                  key: "/login",
                  icon: <LogoutOutlined></LogoutOutlined>,
                },
              ]
            : null
        }
      ></Menu>
    </div>
  );
};

export default Navbar;

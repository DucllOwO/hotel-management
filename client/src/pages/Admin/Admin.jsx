import React, { useContext } from "react";
import "./admin.css";
import Navbar from "../../components/Admin/Navbar/Navbar";
import HR from "./HR/HR";
import Topbar from "../../components/Topbar/Topbar";
import DataTable from "../../components/Table/DataTable";
import OutlineButton from "../../components/Button/Outline/OutlineButton";
import StaffNavbar from "../../components/Staff/Navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import LocalStorage from "../../Utils/localStorage";

const Admin = () => {
  const user = LocalStorage.getItem("user");
  return (
    <div className="container">
      {!user && <Navigate to="/" replace={true} />}
      <Navbar className="navbar"></Navbar>
      <div className="homeContainer">
        <Outlet />
      </div>
      {/* <OutlineButton></OutlineButton> */}
      {/* <StaffNavbar></StaffNavbar> */}
    </div>
  );
};

export default Admin;

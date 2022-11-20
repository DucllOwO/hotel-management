import React, { useContext } from "react";
import "./admin.css";
import Navbar from "../../components/Admin/Navbar/Navbar";
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
        <Topbar
          name="Huỳnh Thế Vĩ"
          img="https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199880924/Boba-Stitch_800x800_SEPS-1000x1000.jpg"
          position="Manager"
        ></Topbar>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;

import React from "react";
import "./admin.css";
import Navbar from "../../components/Admin/Navbar/Navbar";
import Topbar from "../../components/Topbar/Topbar";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="container">
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

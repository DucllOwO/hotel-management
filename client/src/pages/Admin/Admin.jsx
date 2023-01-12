import React, { useEffect } from "react";
import "./admin.css";
import Navbar from "../../components/Admin/Navbar/Navbar";
import Topbar from "../../components/Topbar/Topbar";
import { Navigate, Outlet } from "react-router-dom";
import LocalStorage from "../../Utils/localStorage";
import { userRequest } from "../../api/api";
import ErrorBoundary from "../../components/Error/ErrorBoundary/ErrorBoundary";

const Admin = () => {
  useEffect(() => {
    document.title = "Admin | Parallel Shine";
  });
  const user = LocalStorage.getItem("user");

  userRequest.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${user?.token}`;

  return (
    <ErrorBoundary>
      <div className="container">
        {!user && <Navigate to="/" replace={true} />}
        <Navbar className="navbar"></Navbar>
        <div className="homeContainer">
          <Topbar
            name="Huỳnh Thế Vĩ"
            img="https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199880924/Boba-Stitch_800x800_SEPS-1000x1000.jpg"
            position="Quản lý"
          ></Topbar>
          <Outlet />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Admin;

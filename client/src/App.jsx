import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import HR from "./pages/Admin/HR/HR";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Account from "./pages/Admin/Account/Account";
import Importing from "./pages/Admin/Depot/Importing/Importing";
import Inventory from "./pages/Admin/Depot/Inventory/Inventory";
import Item from "./pages/Admin/Depot/Item/Item";
import Rooms from "./pages/Admin/Room/Rooms/Rooms";
import Booking from "./pages/Staff/Booking/Booking/Booking";
import RoomType from "./pages/Admin/Room/RoomType/RoomType";
import Utilities from "./pages/Admin/Room/Utilities/Utilities";
import Payment from "./pages/Admin/Turnover/Payment/Payment";
import Receipt from "./pages/Admin/Turnover/Reciept/Receipt";
import Login from "./pages/Login/Login";
import Customer from "./pages/Staff/Customer/Customer";
import BookingList from "./pages/Staff/Booking/BookingList/BookingList";
import { AppContext } from "./context/AppContext";
import LocalStorage from "./Utils/localStorage";
import Position from "./pages/Admin/Position/Position";

import _404ErrorBoundary from "./components/Error/ErrorBoundary/_404ErrorBoundary";
import AuthErrorBoundary from "./components/Error/ErrorBoundary/AuthErrorBoundary";
import Promotion from "./pages/Admin/Promotion/Promotion";
import Import from "./components/Admin/Import/Import";
import Home from "./pages/Customer/Home/Home";

import "./app.css";

const App = () => {
  const { user } = useContext(AppContext);
  const [listFeature, setList] = useState([]);
  useEffect(() => {
    setList(LocalStorage.getItem("user")?.permission);
  }, [user]);

  return (
    <BrowserRouter>
      <div className="App" style={{ height: "100vh" }}>
        <Routes>
          <Route key="login" index element={<Login />}></Route>
          <Route key="login1" path="/login" element={<Login />}></Route>
          <Route key="home" path="/home" element={<Home />}></Route>
          <Route key="admin" path="/admin" element={<Admin />}>
            {listFeature
              ? listRoute.map((item) => {
                  if (listFeature.includes(item.key)) return item.value;
                  return null;
                })
              : null}
          </Route>

          <Route
            key="error"
            exact
            path="*"
            element={user ? <_404ErrorBoundary /> : <AuthErrorBoundary />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const listRoute = [
  {
    key: "Thống kê",
    value: (
      <Route key="Dashboard" index path="dashboard" element={<Dashboard />} />
    ),
  },
  {
    key: "Tài khoản",
    value: <Route key="Account" index path="account" element={<Account />} />,
  },
  {
    key: "Nhập sản phẩm",
    value: (
      <Route key="Import" index path="importing" element={<Importing />} />
    ),
  },
  {
    key: "Nhân sự",
    value: <Route key="Employee" index path="hr" element={<HR />} />,
  },
  {
    key: "Kiểm tra phòng",
    value: (
      <Route key="Inventory" index path="inventory" element={<Inventory />} />
    ),
  },
  {
    key: "Quản lý sản phẩm",
    value: <Route key="Item" index path="items" element={<Item />} />,
  },
  {
    key: "Danh mục phòng",
    value: <Route key="Room" index path="rooms" element={<Rooms />} />,
  },
  {
    key: "Loại phòng",
    value: (
      <Route key="Room_type" index path="roomtype" element={<RoomType />} />
    ),
  },
  {
    key: "Tiện ích",
    value: (
      <Route key="Utilities" index path="utilities" element={<Utilities />} />
    ),
  },
  {
    key: "Phiếu chi",
    value: <Route key="Payment" index path="payment" element={<Payment />} />,
  },
  {
    key: "Hóa đơn",
    value: <Route key="Receipt" index path="receipt" element={<Receipt />} />,
  },
  {
    key: "Chức vụ",
    value: (
      <Route key="Position" index path="position" element={<Position />} />
    ),
  },
  {
    key: "Khách hàng",
    value: (
      <Route key="Customer" index path="customer" element={<Customer />} />
    ),
  },
  {
    key: "Đặt phòng",
    value: <Route index path="bookings" element={<Booking />} />,
  },
  {
    key: "Phiếu giảm giá",
    value: (
      <Route key="Promotion" index path="promotion" element={<Promotion />} />
    ),
  },
  {
    key: "Đặt phòng",
    value: <Route index path="bookings/list" element={<BookingList />} />,
  },
  {
    key: "Nhập hàng",
    value: <Route index path="/importing" element={<Import />} />,
  },
];

export default App;

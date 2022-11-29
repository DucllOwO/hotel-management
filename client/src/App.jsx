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
import RoomType from "./pages/Admin/Room/RoomType/RoomType";
import Utilities from "./pages/Admin/Room/Utilities/Utilities";
import Payment from "./pages/Admin/Turnover/Payment/Payment";
import Receipt from "./pages/Admin/Turnover/Reciept/Receipt";
import Login from "./pages/Login/Login";
import Customer from "./pages/Staff/Customer/Customer";
import Booking from "./pages/Staff/Booking/Booking";
import StaffReciept from "./pages/Staff/Receipt/Receipt";
import { AppContext } from "./context/AppContext";
import LocalStorage from "./Utils/localStorage";
import Position from "./pages/Admin/Position/Position";

import _404ErrorBoundary from "./components/Error/ErrorBoundary/_404ErrorBoundary";
import AuthErrorBoundary from "./components/Error/ErrorBoundary/AuthErrorBoundary";
import Promotion from "./pages/Admin/Promotion/Promotion";

const App = () => {
  const { user } = useContext(AppContext);
  const [listFeature, setList] = useState([]);
  useEffect(() => {
    setList(LocalStorage.getItem("user")?.permission);
  }, [user]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route key="login" index element={<Login />}></Route>
          <Route key="login1" path="/login" element={<Login />}></Route>
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
    key: "Dashboard",
    value: (
      <Route key="Dashboard" index path="dashboard" element={<Dashboard />} />
    ),
  },
  {
    key: "Account",
    value: <Route key="Account" index path="account" element={<Account />} />,
  },
  {
    key: "Import",
    value: (
      <Route key="Import" index path="importing" element={<Importing />} />
    ),
  },
  {
    key: "Employee",
    value: <Route key="Employee" index path="hr" element={<HR />} />,
  },
  {
    key: "Inventory",
    value: (
      <Route key="Inventory" index path="inventory" element={<Inventory />} />
    ),
  },
  {
    key: "Item",
    value: <Route key="Item" index path="item" element={<Item />} />,
  },
  {
    key: "Room",
    value: <Route key="Room" index path="rooms" element={<Rooms />} />,
  },
  {
    key: "Room type",
    value: (
      <Route key="Room_type" index path="roomtype" element={<RoomType />} />
    ),
  },
  {
    key: "Utilities",
    value: (
      <Route key="Utilities" index path="utilities" element={<Utilities />} />
    ),
  },
  {
    key: "Payment",
    value: <Route key="Payment" index path="payment" element={<Payment />} />,
  },
  {
    key: "Receipt",
    value: <Route key="Receipt" index path="receipt" element={<Receipt />} />,
  },
  {
    key: "Position",
    value: (
      <Route key="Position" index path="position" element={<Position />} />
    ),
  },
  {
    key: "Customer",
    value: (
      <Route key="Customer" index path="customer" element={<Customer />} />
    ),
  },
  {
    key: "Booking",
    value: <Route key="Booking" index path="booking" element={<Booking />} />,
  },
  {
    key: "Promotion",
    value: (
      <Route key="Promotion" index path="receipt" element={<Promotion />} />
    ),
  },
];

export default App;

import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  redirect,
} from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import Staff from "./pages/Staff/Staff";
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
import Reciept from "./pages/Admin/Turnover/Reciept/Reciept";
import Login from "./pages/Login/Login";
import Customer from "./pages/Staff/Customer/Customer";
import Booking from "./pages/Staff/Booking/Booking";
import StaffReciept from "./pages/Staff/Receipt/Receipt";
import { AppContext } from "./context/AppContext";
import LocalStorage from "./Utils/localStorage";
import Position from "./pages/Admin/Position/Position";

const App = () => {
  const user = LocalStorage.getItem("user");
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route index element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          {true ? (
            <Route path="/admin" element={<Admin />}>
              <Route index path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="importing" element={<Importing />} />
              <Route path="hr" element={<HR />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="item" element={<Item />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="roomtype" element={<RoomType />} />
              <Route path="utilities" element={<Utilities />} />
              <Route path="payment" element={<Payment />} />
              <Route path="receipt" element={<Reciept />} />
              <Route path="position" element={<Position />} />
            </Route>
          ) : (
            <Route path="/staff" element={<Staff />}>
              <Route index path="customer" element={<Customer />} />
              <Route path="booking" element={<Booking />} />
              <Route path="receipt" element={<StaffReciept />} />
            </Route>
          )}
          {/* <Route path="/admin/account" element={<Account />} /> */}
        </Routes>

        {/* <BrowserRouter>
        <Admin/>
        <Routes>
          <Route path='/'>
            <Route index element={<Staff/>} />
          </Route>
          <Route path='/admin'>
            <Route index element={<Dashboard/>} />
            <Route path="hr" element={<HR/>} />
            <Route path="account" element={<Account/>} />
            <Route path="importing" element={<Importing/>} />
            <Route path="inventory" element={<Inventory/>} />
            <Route path="item" element={<Item/>} />
            <Route path="rooms" element={<Rooms/>} />
            <Route path="roomtype" element={<RoomType/>} />
            <Route path="utilities" element={<Utilities/>} />
            <Route path="payment" element={<Payment/>} />
            <Route path="reciept" element={<Reciept/>} />
          </Route>
        </Routes>
      </BrowserRouter> */}
      </div>
    </BrowserRouter>
  );
};

export default App;

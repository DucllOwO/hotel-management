import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
import { AppContext } from "./context/AppContext";
import LocalStorage from "./Utils/localStorage";

const App = () => {
  const user = LocalStorage.getItem("user");
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}></Route>

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
              <Route path="reciept" element={<Reciept />} />
            </Route>
          ) : (
            <Route path="/staff" element={<Staff />} />
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

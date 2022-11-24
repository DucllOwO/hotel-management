import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import _404ErrorBoundary from "./components/ErrorBoundary/_404ErrorBoundary";
import Customer from "./pages/Staff/Customer/Customer";
import Booking from "./pages/Staff/Booking/Booking";
import StaffReciept from "./pages/Staff/Receipt/Receipt";
import { AppContext } from "./context/AppContext";
import LocalStorage from "./Utils/localStorage";
import Position from "./pages/Admin/Position/Position";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

const App = () => {
  const { user } = useContext(AppContext)
  const [listFeature, setList] = useState([]);
  useEffect(() => {
    setList(LocalStorage.getItem("user")?.permission);
  }, [user])
  
  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route index element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
              <Route exact path="*" element={<_404ErrorBoundary/>}/>
            <Route path="/admin" element={<Admin />}>
              {listFeature ? listRoute.map((item) => {
                if(listFeature.includes(item.key))
                return item.value;
                return null;
              }) : null}  
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
  );
};

const listRoute = [
  {key: "Dashboard",  value:<Route index path="dashboard" element={<Dashboard />} /> },
  {key: "Account",  value:<Route index path="account" element={<Account />} />},
  {key: "Import",  value:<Route index path="importing" element={<Importing />} />},
  {key: "HR",  value:<Route index path="hr" element={<HR />} />},
  {key: "Inventory",  value:<Route index path="inventory" element={<Inventory />} />},
  {key: "Item",  value:<Route index path="item" element={<Item />} />},
  {key: "Room",  value:<Route index path="rooms" element={<Rooms />} />},
  {key: "Room type",  value:<Route index path="roomtype" element={<RoomType />} />},
  {key: "Utilities",  value:<Route index path="utilities" element={<Utilities />} />},
  {key: "Payment",  value:<Route index path="payment" element={<Payment />} />},
  {key: "Receipt",  value:<Route index path="receipt" element={<Reciept />} />},
  {key: "Position",  value:<Route index path="position" element={<Position />} />},
  {key: "Customer",  value:<Route index path="customer" element={<Customer />} />},
  {key: "Booking",  value:<Route index path="booking" element={<Booking />} />},
  {key: "Dashboard",  value:<Route index path="receipt" element={<StaffReciept />} />},
];

export default App;

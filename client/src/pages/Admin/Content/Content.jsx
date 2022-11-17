import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route
  } from 'react-router-dom';
import HR from "../HR/HR";
import Dashboard from "../Dashboard/Dashboard";
import Account from "../Account/Account";
import Importing from "../Depot/Importing/Importing";
import Inventory from "../Depot/Inventory/Inventory";
import Item from "../Depot/Item/Item";
import Rooms from "../Room/Rooms/Rooms";
import RoomType from "../Room/RoomType/RoomType";
import Utilities from "../Room/Utilities/Utilities";
import Payment from "../Turnover/Payment/Payment";
import Reciept from "../Turnover/Reciept/Reciept";
import Login from '../../Login/Login';

const Content = () => {
  return (
    <Routes>
        <Route exact path="/account" element={<Account/>} />
        <Route path="/admin/importing" element={<Importing/>} />
        <Route path="/admin/inventory" element={<Inventory/>} />
        <Route path="/admin/item" element={<Item/>} />
        <Route path="/admin/rooms" element={<Rooms/>} />
        <Route path="/admin/roomtype" element={<RoomType/>} />
        <Route path="/admin/utilities" element={<Utilities/>} />
        <Route path="/admin/payment" element={<Payment/>} />
        <Route path="/admin/reciept" element={<Reciept/>} />
    </Routes>
  )
}

export default Content
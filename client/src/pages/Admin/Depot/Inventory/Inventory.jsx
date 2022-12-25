import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { fetchRoomByStatus } from "../../../../api/RoomAPI";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";
import { AppContext } from "../../../../context/AppContext";
import InventoryTable from "../../Tables/Inventory/InventoryTable";
import "./inventory.css";

const CLEANING_STATUS = 3;

const Inventory = () => {
  const { user } = useContext(AppContext);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRoomByStatus(user.position, CLEANING_STATUS)
      .then(({ data }) => {
        console.log(data);
        setRooms(data);
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Lấy dữ liệu phòng chưa dọn dẹp thất bại!");
      });
  }, [user.position]);

  return (
    <div className="inventoryContainer">
      <InventoryTable rooms={rooms}></InventoryTable>
    </div>
  );
};

export default Inventory;

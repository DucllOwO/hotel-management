import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { fetchBookingByStatus } from "../../../../api/InventoryAPI";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";
import { AppContext } from "../../../../context/AppContext";
import { ItemProvider } from "../../../../context/ItemContext";
import InventoryTable from "../../Tables/Inventory/InventoryTable";
import "./inventory.css";

const USING_STATUS = 1;

const Inventory = () => {
  const { user } = useContext(AppContext);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    document.title = "Checking | Parallel Shine";
    fetchBookingByStatus(user.position, "1")
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
    <ItemProvider>
      <div className="inventoryContainer">
        <InventoryTable rooms={rooms} user={user}></InventoryTable>
      </div>
    </ItemProvider>
  );
};

export default Inventory;

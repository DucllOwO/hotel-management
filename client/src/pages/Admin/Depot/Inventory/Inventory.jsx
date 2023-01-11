import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { fetchBookingByStatus } from "../../../../api/InventoryAPI";
import { getAllRoomType } from "../../../../api/RoomTypeAPI";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";
import { AppContext } from "../../../../context/AppContext";
import { ItemProvider } from "../../../../context/ItemContext";
import InventoryTable from "../../Tables/Inventory/InventoryTable";
import "./inventory.css";

const USING_STATUS = 1;

const Inventory = () => {
  const { user } = useContext(AppContext);
  const [rooms, setRooms] = useState([]);
  const [roomtype, setRoomTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    document.title = "Checking | Parallel Shine";
    fetchBookingByStatus(user?.position, "1")
      .then(({ data }) => {
        setRooms(data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        ErrorAlert("Lấy dữ liệu kiểm tra phòng thất bại!");
      })
      .finally(() => setIsLoading(false));
    getAllRoomType(user?.position)
      .then(({ data }) => {
        console.log(data);
        setRoomTypes(data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        ErrorAlert("Lấy dữ liệu loại phòng thất bại!");
      })
      .finally(() => setIsLoading(false));
  }, [user.position]);

  return (
    <ItemProvider>
      <div className="inventoryContainer">
        <InventoryTable
          setRooms={setRooms}
          roomType={roomtype}
          rooms={rooms}
          user={user}
          isLoading={isLoading}
          positionUser={user.position}
        ></InventoryTable>
      </div>
    </ItemProvider>
  );
};

export default Inventory;

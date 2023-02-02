import React, { useState, useContext, useEffect } from "react";
import RoomsTable from "../../Tables/Rooms/RoomsTable";
import Topbar from "../../../../components/Topbar/Topbar";
import { fetchRoom } from "../../../../api/RoomAPI";
import { getAllRoomType } from "../../../../api/RoomTypeAPI";
import { AppContext } from "../../../../context/AppContext";
import "./rooms.css";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const { user } = useContext(AppContext);
  const [listType, setListType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    document.title = "Room List | Parallel Shine";
    fetchRoom(user?.position)
      .then(({ data }) => {
        console.log(data);
        setRooms(data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        ErrorAlert("Lấy dữ liệu phòng thất bại!!");
      })
      .finally(() => setIsLoading(false));
    getAllRoomType(user?.position).then(({ data }) => {
      console.log(data);
      setListType(data);
    });
  }, []);
  return (
    <div className="roomsContainer">
      <RoomsTable
        isLoading={isLoading}
        rooms={rooms}
        positionUser={user.position}
        setRoom={setRooms}
        listType={listType}
      ></RoomsTable>
    </div>
  );
};

export default Rooms;

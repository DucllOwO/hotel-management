import React, { useState, useContext, useEffect } from "react";
import RoomsTable from "../../Tables/Rooms/RoomsTable";
import Topbar from "../../../../components/Topbar/Topbar";
import { fetchRoom } from "../../../../api/RoomAPI";
import { getAllRoomType } from "../../../../api/RoomTypeAPI";
import { AppContext } from "../../../../context/AppContext";
import "./rooms.css";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const { user } = useContext(AppContext);
  const [listType, setListType] = useState([]);

  useEffect(() => {
    document.title = "Room List | Parallel Shine";
    fetchRoom(user?.position).then(({ data }) => {
      console.log(data);
      setRooms(data);
    });
    getAllRoomType(user?.position).then(({ data }) => {
      console.log(data);
      setListType(data);
    });
  }, []);
  return (
    <div className="roomsContainer">
      <RoomsTable
        rooms={rooms}
        positionUser={user.position}
        setRoom={setRooms}
        listType={listType}
      ></RoomsTable>
    </div>
  );
};

export default Rooms;

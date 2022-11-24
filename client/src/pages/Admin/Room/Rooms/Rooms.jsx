import React from "react";
import RoomsTable from "../../Tables/Rooms/RoomsTable";
import Topbar from "../../../../components/Topbar/Topbar";
import "./rooms.css";

const Rooms = () => {
  return (
    <div className="container">
      <div className="roomsContainer">
        <RoomsTable></RoomsTable>
      </div>
    </div>
  );
};

export default Rooms;
